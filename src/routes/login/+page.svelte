<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Card from '$lib/ui/Card.svelte';
  import './login.css';

  let username = '';
  let otp = '';
  let password = '';
  let error: string | null = null;
  let message: string | null = null;
  let otpSent = false;
  let loading = false;
  let remember = false;
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
      form.append('remember', remember ? '1' : '0');
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
  form.append('remember', remember ? '1' : '0');
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
  form.append('remember', remember ? '1' : '0');
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

    <div class="login-helpers">
      <label class="remember-label" for="remember">
        <input id="remember" type="checkbox" bind:checked={remember} aria-label="Remember me" />
        <span class="remember-text">Remember me</span>
      </label>
      <a href="/login/forgot" class="forgot-link">Forgot password?</a>
    </div>

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

<!-- styles moved to src/routes/login/login.css to avoid inline styles -->
