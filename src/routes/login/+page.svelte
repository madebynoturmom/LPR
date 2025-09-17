<script lang="ts">
  let username = '';
  let password = '';
  let error: string | null = null;
</script>

<section class="login-section">
  <form method="POST" class="login-form">
    <h2>Login</h2>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    <label>Username<input name="username" bind:value={username} required /></label>
    <label>Password<input type="password" name="password" bind:value={password} required /></label>
    <button type="submit" class="login-btn">Login</button>
  </form>
</section>

<style>
.login-section {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.login-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
.login-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover {
  background: #1565c0;
}
.error {
  color: #b00;
  margin-bottom: 1rem;
}
</style>
