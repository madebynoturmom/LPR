<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let username = '';
  let otp = '';
  let error: string | null = null;
  let message: string | null = null;
  let otpSent = false;
  let loading = false;

  async function sendOtp() {
    error = null;
    message = null;
    if (!username.trim()) {
      error = 'Please enter a username';
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
      // success path typically redirects; if server returned JSON, handle it
      if (data?.success) {
        // If server returned a redirect URL, navigate there
        if (data.redirect) {
          goto(data.redirect);
          return;
        }
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
      if (otpSent) verifyOtp();
      else sendOtp();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });
</script>

<section class="login-section">
  <div class="login-form">
    <h2>Login</h2>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    {#if message}
      <div class="message">{message}</div>
    {/if}

    <label>Username
      <input name="username" bind:value={username} autocomplete="username" />
    </label>

    {#if otpSent}
      <label>OTP
        <input name="otp" bind:value={otp} autocomplete="one-time-code" />
      </label>
      <button class="login-btn" on:click={verifyOtp} disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
    {:else}
      <button class="login-btn" on:click={sendOtp} disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
    {/if}
  </div>
</section>

<style>
.login-section{max-width:420px;margin:4rem auto;padding:2rem;background:#fff;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.07)}
.login-form{display:flex;flex-direction:column;gap:1rem}
.login-form label{display:flex;flex-direction:column}
.login-btn{background:#1976d2;color:#fff;padding:.6rem;border-radius:8px;border:0}
.error{color:#b00}
.message{color:green}
</style>
