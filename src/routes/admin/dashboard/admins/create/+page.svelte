<script lang="ts">
  import { goto } from '$app/navigation';
  let username = '';
  let password = '';
  let name = '';
  let email = '';
  let phone = '';
  let profilePic: File | null = null;
  let profilePicPreview: string | null = null;
  let error: string | null = null;
  let creating = false;

  async function handleSubmit(e: Event) {
    e.preventDefault();
    creating = true;
    error = null;
    const hash = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    const formData = new FormData();
    formData.set('username', username);
    formData.set('passwordHash', hashHex);
    formData.set('name', name);
    formData.set('email', email);
    formData.set('phone', phone);
    if (profilePic) formData.set('profilePic', profilePic);
    const res = await fetch('./create', { method: 'POST', body: formData });
    if (!res.ok) error = 'Failed to create admin';
    creating = false;
    if (res.ok) goto('/admin/dashboard/admins');
  }
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => history.back()}>&larr; Back</button>
  <h2>Add New Admin</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <form on:submit={handleSubmit} class="create-admin-form">
    <label>Username <input type="text" bind:value={username} required /></label>
    <label>Password <input type="password" bind:value={password} required /></label>
    <label>Name <input type="text" bind:value={name} /></label>
    <label>Email <input type="email" bind:value={email} /></label>
    <label>Phone <input type="text" bind:value={phone} /></label>
    <label>Profile Picture
      <input type="file" accept="image/*" on:change={e => {
        const file = (e.target as HTMLInputElement).files?.[0] ?? null;
        profilePic = file;
        if (file) {
          const reader = new FileReader();
          reader.onload = ev => profilePicPreview = ev.target?.result as string;
          reader.readAsDataURL(file);
        } else {
          profilePicPreview = null;
        }
      }} />
    </label>
    <div style="margin-bottom:1rem;">
      {#if profilePicPreview}
        <img src={profilePicPreview} alt="Preview" style="max-width:120px;max-height:120px;border-radius:8px;" />
      {:else}
  <img src="/default-profile.png" alt="Default profile placeholder" style="max-width:120px;max-height:120px;opacity:0.3;border-radius:8px;" />
      {/if}
    </div>
    <button type="submit" class="btn btn-create" disabled={creating}>Create Admin</button>
  </form>
</section>

<style>
.admin-section {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.back-btn {
  margin-bottom: 1rem;
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.back-btn:hover {
  background: #ddd;
}
.create-admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.create-admin-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
.btn-create {
  background: #1976d2;
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.btn-create:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #c00;
  margin-bottom: 1rem;
}
</style>
