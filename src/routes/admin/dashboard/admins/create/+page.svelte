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
  <h2 class="admin-title">Add New Admin</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <form on:submit={handleSubmit} class="create-admin-form">
    <div class="form-grid">
      <label>Username <input class="text-input" type="text" bind:value={username} required /></label>
      <label>Password <input class="text-input" type="password" bind:value={password} required /></label>
      <label>Name <input class="text-input" type="text" bind:value={name} /></label>
      <label>Email <input class="text-input" type="email" bind:value={email} /></label>
      <label>Phone <input class="text-input" type="text" bind:value={phone} /></label>
    </div>
    <label class="profile-upload">Profile Picture
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
    <div class="avatar-preview">
      {#if profilePicPreview}
        <img src={profilePicPreview} alt="Preview" />
      {:else}
        <img src="/default-profile.png" alt="Default profile placeholder" />
      {/if}
    </div>
    <button type="submit" class="btn btn-create primary-cta" disabled={creating}>Create Admin</button>
  </form>
</section>

<style>
.admin-section {
  max-width: 620px;
  margin: 4.5rem auto 2.5rem auto; /* move card further down */
  padding: 2rem;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(16,24,40,0.06);
}
.back-btn {
  margin-bottom: 1rem;
  background: #f1f5f9;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.back-btn:hover { background: #e2e8f0; }
.admin-title { font-size: 2rem; margin: 0 0 1rem 0; font-weight: 800; color: #0f172a; text-align: left; }
.form-grid { display: grid; grid-template-columns: 1fr; gap: 0.9rem; }
.text-input { padding: 0.6rem 0.8rem; border-radius: 10px; border: 1px solid #e6eef8; background: #f8fafc; }
.profile-upload input[type="file"] { margin-top: 0.5rem; }
.avatar-preview { margin: 1rem 0; display:flex; justify-content:center; }
.avatar-preview img { width:120px; height:120px; border-radius:9999px; object-fit:cover; border: 3px solid #1976d2; box-shadow: 0 8px 24px rgba(16,24,40,0.06); }
.primary-cta { display:block; width:54%; margin: 0.5rem 0 0 0; padding: 0.9rem 1.2rem; border-radius: 12px; font-size:1.05rem; }
.btn-create { background: linear-gradient(90deg,#1976d2,#1565c0); color:#fff; border:none; font-weight:700; cursor:pointer; }
.btn-create:disabled { opacity:0.6; cursor:not-allowed; }
.error { color: #c00; margin-bottom: 1rem; }
</style>
