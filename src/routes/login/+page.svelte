<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Card from '$lib/ui/Card.svelte';

  let username = '';
  let otp = '';
  let password = '';
  let error: string | null = null;
  let message: string | null = null;
  let otpSent = false;
  let loading = false;
  let identifiedRole: string | null = null;

  async function sendOtp() {
    error = null;
    message = null;
    if (!username.trim()) {
      error = 'Please enter a username';
      return;
    }
    // Ensure we know the role before attempting OTP. Guards must use password.
    await identifyUser();
    if (identifiedRole === 'guard') {
      error = 'This account is a guard. Please login with password.';
      return;
    }
    loading = true;
    try {
      const form = new FormData();
      form.append('username', username.trim());
      // Use an explicit same-origin URL so failures are easier to diagnose
      const url = new URL('/login', location.origin).toString();
      const res = await fetch(url, { method: 'POST', body: form, headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      // If server sent a redirect (unlikely for OTP send), follow it
      if (res.redirected) {
        goto(res.url);
        return;
      }
      // Read body as text first, then try to parse JSON. This handles
      // misconfigured Content-Type headers and avoids double-reading the body.
      const text = await res.text().catch(() => null);
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          // Not JSON — keep raw text for messaging/debugging
          console.warn('sendOtp: response not JSON, using text fallback');
        }
      }

      // Handle responses wrapped by Paraglide middleware which compact payloads.
      // Example returned body seen in the wild:
      // {"type":"success","status":200,"data":"[{\"otpSent\":1,\"message\":2},true,\"OTP sent to your email.\"]"}
      // The "data" field is a JSON-encoded array where index-maps point at values.
      function decodeParaglideWrapper(obj: any) {
        try {
          if (obj && obj.type && typeof obj.data === 'string') {
            const inner = JSON.parse(obj.data);
            if (Array.isArray(inner) && inner.length > 0 && typeof inner[0] === 'object') {
              const mapping = inner[0];
              const out: any = {};
              for (const k of Object.keys(mapping)) {
                const idx = mapping[k];
                out[k] = inner[idx];
              }
              return out;
            }
            return inner;
          }
        } catch (e) {
          // fallthrough
        }
        return obj;
      }

      if (!res.ok) {
        console.error('sendOtp: non-ok response', res.status, text);
        error = data?.error || text || 'Failed to send OTP';
        return;
      }

      // decode if Paraglide wrapped the payload
      if (data && typeof data === 'object' && data.type) {
        data = decodeParaglideWrapper(data) as any;
      }

      if (data?.otpSent) {
        otpSent = true;
        message = data.message || 'OTP sent to your email';
        // focus OTP input after render
        requestAnimationFrame(() => (document.querySelector('input[name="otp"]') as HTMLInputElement)?.focus());
      } else if (text && !data) {
        // OK (2xx) but non-JSON body — show as informative message
        message = text;
      }
    } catch (e: any) {
      console.error('sendOtp: fetch error', e);
      // Typical DOM TypeError when the network/host is unreachable
      if (e instanceof TypeError && /failed to fetch/i.test(String(e.message))) {
        error = `Cannot reach backend at ${location.origin}. Is the dev server running?`;
      } else {
        error = e?.message || 'Network error';
      }
    } finally {
      loading = false;
    }
  }

  async function submitGuardPassword() {
    error = null;
    message = null;
    if (!username.trim()) {
      error = 'Please enter a username';
      return;
    }
    if (!password.trim()) {
      error = 'Please enter your password';
      return;
    }
    loading = true;
    try {
      const form = new FormData();
      form.append('username', username.trim());
      form.append('password', password.trim());
      const url = new URL('/login', location.origin).toString();
      const res = await fetch(url, { method: 'POST', body: form, headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      if (res.redirected) {
        goto(res.url);
        return;
      }
      const text = await res.text().catch(() => null);
      let data = null;
      if (text) {
        try { data = JSON.parse(text); } catch (e) { /* ignore */ }
      }
      // decode Paraglide wrapper if present (same format used elsewhere)
      if (data && typeof data === 'object' && data.type) {
        try {
          const inner = JSON.parse(data.data);
          if (Array.isArray(inner) && inner.length > 0 && typeof inner[0] === 'object') {
            const mapping = inner[0];
            const out: any = {};
            for (const k of Object.keys(mapping)) {
              const idx = mapping[k];
              out[k] = inner[idx];
            }
            data = out;
          } else {
            data = inner;
          }
        } catch (e) {
          // leave data as-is
        }
      }
      if (!res.ok) {
        error = data?.error || text || 'Login failed';
        return;
      }
      // success — follow server-provided redirect if present
      if (data?.success) {
        if (data.redirect) {
          goto(data.redirect);
          return;
        }
        goto('/');
        return;
      }
      // If OK but non-JSON, show the text as a message
      if (text && !data) {
        message = text;
      }
    } catch (e: any) {
      console.error('submitGuardPassword: fetch error', e);
      if (e instanceof TypeError && /failed to fetch/i.test(String(e.message))) {
        error = `Cannot reach backend at ${location.origin}. Is the dev server running?`;
      } else {
        error = e?.message || 'Network error';
      }
    } finally {
      loading = false;
    }
  }

  async function verifyOtp() {
    error = null;
    message = null;
    if (!otp.trim()) {
      error = 'Please enter the OTP';
      return;
    }
    loading = true;
    try {
      const form = new FormData();
      form.append('username', username.trim());
      form.append('otp', otp.trim());
      const url = new URL('/login', location.origin).toString();
      const res = await fetch(url, { method: 'POST', body: form, headers: { Accept: 'application/json' }, credentials: 'same-origin' });
      // If server responds with redirect, follow it
      if (res.redirected) {
        goto(res.url);
        return;
      }
      const text = await res.text().catch(() => null);
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.warn('verifyOtp: response not JSON, using text fallback');
        }
      }
      if (data && typeof data === 'object' && data.type) {
        // decode Paraglide wrapper if present
        try {
          const inner = JSON.parse(data.data);
          if (Array.isArray(inner) && inner.length > 0 && typeof inner[0] === 'object') {
            const mapping = inner[0];
            const out: any = {};
            for (const k of Object.keys(mapping)) {
              const idx = mapping[k];
              out[k] = inner[idx];
            }
            data = out;
          } else {
            data = inner;
          }
        } catch (e) {
          // leave data as-is
        }
      }
      if (!res.ok) {
        console.error('verifyOtp: non-ok response', res.status, text);
        error = data?.error || text || 'OTP verification failed';
        return;
      }
      // success path typically redirects; first check for an explicit redirect
      // value either in parsed JSON or in the Paraglide-wrapped payload.
      const redirectTarget = data?.redirect || (Array.isArray(data) && data[2]) || null;
      if (redirectTarget) {
        goto(redirectTarget);
        return;
      }
      if (data?.success) {
        goto('/');
        return;
      }
      // If OK but non-JSON, show the text as a message (informational)
      if (text && !data) {
        message = text;
      }
    } catch (e: any) {
      console.error('verifyOtp: fetch error', e);
      if (e instanceof TypeError && /failed to fetch/i.test(String(e.message))) {
        error = `Cannot reach backend at ${location.origin}. Is the dev server running?`;
      } else {
        error = e?.message || 'Network error';
      }
    } finally {
      loading = false;
    }
  }

  // Prevent full page navigation on Enter when OTP field is shown
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (identifiedRole === 'guard') {
        submitGuardPassword();
      } else if (otpSent) verifyOtp();
      else sendOtp();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', onKeydown);
    // Prevent the page from scrolling while the login page is mounted
    const prevOverflow = document.documentElement.style.overflow || document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeydown);
      // restore previous overflow style
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = prevOverflow;
    };
  });

  // Ask server which role this username belongs to. This lets us
  // show a password input for guards and keep OTP flow for others.
  async function identifyUser() {
    identifiedRole = null;
    if (!username.trim()) return;
    try {
      const url = new URL('/login/identify', location.origin);
      url.searchParams.set('username', username.trim());
      const res = await fetch(url.toString(), { method: 'GET', credentials: 'same-origin' });
      if (!res.ok) return; // leave identifiedRole as null
      const data = await res.json().catch(() => null);
      if (data && data.role) identifiedRole = data.role;
    } catch (e) {
      // ignore — identification is a nicety, server side still enforces auth
      console.warn('identifyUser failed', e);
    }
  }
</script>

<section class="login-viewport">
  <div class="login-container">
  <!-- use shared Card component for consistent visuals -->
  <svelte:component this={Card} className="login-section" padding="2.25rem">
      <div class="brand">
        <div class="logo">RAMS</div>
        <div class="title">Residence Access Management System</div>
      </div>
      <div class="login-form">
        <h2>Login</h2>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    {#if message}
      <div class="message">{message}</div>
    {/if}

    <label>Username
      <input name="username" bind:value={username} autocomplete="username" on:blur={() => identifyUser()} />
    </label>

    {#if identifiedRole === 'guard'}
      <label>Password
        <input name="password" bind:value={password} type="password" autocomplete="current-password" />
      </label>
      <button class="login-btn" on:click={submitGuardPassword} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    {:else}
      {#if otpSent}
      <label>OTP
        <input name="otp" bind:value={otp} autocomplete="one-time-code" />
      </label>
      <button class="login-btn" on:click={verifyOtp} disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
      {:else}
        <button class="login-btn" on:click={sendOtp} disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
      {/if}
    {/if}
  </div>
  </svelte:component>
  </div>
</section>

<style>
/* Page layout */
/* Centered viewport */
.login-viewport{
  position:fixed;
  inset:0; /* top:0; right:0; bottom:0; left:0 */
  display:grid;
  place-items:center; /* reliably center both axes */
  padding:1.5rem;
  background: linear-gradient(180deg,#f4f7fb,#eef4fb);
  -webkit-overflow-scrolling: touch;
}

.login-container{
  width:100%;
  max-width:520px;
  display:block;
  align-items:center;
  justify-content:center;
  margin:0 auto;
}

.brand{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:0.25rem;
  margin-bottom:0.6rem;
}
.brand .logo{
  font-weight:800;
  font-size:28px;
  background:linear-gradient(90deg,#1976d2,#60a5fa);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.brand .title{
  font-size:13px;
  color:#475569;
  opacity:0.95;
  text-align:center;
}

/* visual card styles moved to shared Card component */

.login-form{display:flex;flex-direction:column;gap:1rem}
.login-form h2{margin:0 0 .25rem 0;font-size:1.5rem;color:#0f1724}

/* Inputs */
.login-form label{display:flex;flex-direction:column;font-size:0.9rem;color:#334155}
.login-form input{
  margin-top:0.5rem;
  padding:0.65rem 0.75rem;
  border-radius:10px;
  border:1px solid rgba(16,24,40,0.08);
  background: #fff;
  box-shadow: 0 1px 0 rgba(16,24,40,0.02);
  font-size:0.95rem;
  color:#0b1220;
  transition: box-shadow .12s ease, transform .06s ease;
  width:100%;
  box-sizing: border-box;
}
.login-form input:focus{outline:none; box-shadow: 0 6px 24px rgba(25,118,210,0.12); transform: translateY(-1px); border-color: rgba(25,118,210,0.35)}

/* Primary button */
.login-btn{
  background: linear-gradient(180deg,#1976d2,#125ea8);
  color:#fff;
  padding:.7rem;
  border-radius:12px;
  border:0;
  font-weight:600;
  letter-spacing:0.2px;
  cursor:pointer;
  box-shadow: 0 6px 18px rgba(25,118,210,0.14);
  transition: transform .08s ease, box-shadow .12s ease, opacity .12s ease;
  width:100%;
  box-sizing: border-box;
}
.login-btn:active{transform: translateY(1px)}
.login-btn[disabled]{opacity:0.6; cursor:not-allowed; box-shadow:none}

/* Messages */
.error{color:#b91c1c;background:rgba(185,28,28,0.06);padding:0.5rem 0.75rem;border-radius:8px;font-size:0.9rem}
.message{color:#065f46;background:rgba(6,95,70,0.06);padding:0.5rem 0.75rem;border-radius:8px;font-size:0.9rem}

/* Responsive tweaks */
@media (max-width:520px){
  .login-viewport{padding:1rem}
  .login-form h2{font-size:1.25rem}
  /* ensure inputs and buttons are easily tappable */
  .login-form input{font-size:1rem;padding:0.75rem}
  .login-btn{padding:0.85rem}
}

/* Card styles live in $lib/ui/Card.svelte */
</style>
