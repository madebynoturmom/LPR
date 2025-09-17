<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';
  let name = '';
  let email = '';
  let username = '';
  let password = '';
  let profilePic = '';
  let file: File | null = null;
  let message = '';

  // Load current user details from page data
  $: user = $page.data?.user;
  onMount(() => {
    if (user) {
      name = user.name || '';
      email = user.email || '';
      username = user.username || '';
      profilePic = user.profilePic || '';
    }
  });

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      file = input.files[0];
      profilePic = URL.createObjectURL(file);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    if (password) formData.append('password', password);
    if (file) formData.append('profilePicture', file);
    const res = await fetch('/admin/dashboard/settings', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      message = 'Account updated successfully!';
      await invalidate('user');
    } else {
      message = 'Failed to update account.';
    }
  }
</script>


<div class="settings-container">
  <a href="/admin/dashboard" class="back-btn">← Back to Dashboard</a>
  <h1>Account Settings</h1>
  <form class="settings-form" on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <div class="profile-pic-section">
      <img src={profilePic || '/default-profile.png'} alt="Profile preview" class="profile-pic-preview" />
      <label for="profilePicture" class="upload-label">Change Photo
        <input id="profilePicture" type="file" accept="image/*" on:change={handleFileChange} />
      </label>
    </div>
    <div class="form-row">
      <label for="username">Username</label>
      <input id="username" type="text" bind:value={username} required />
    </div>
    <div class="form-row">
      <label for="name">Name</label>
      <input id="name" type="text" bind:value={name} required />
    </div>
    <div class="form-row">
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required />
    </div>
    <div class="form-row">
      <label for="password">New Password</label>
      <input id="password" type="password" bind:value={password} placeholder="Leave blank to keep current password" autocomplete="new-password" />
    </div>
    <button class="save-btn" type="submit">Save Changes</button>
    {#if message}
      <p class="message">{message}</p>
    {/if}
  </form>
</div>

<style>
.settings-container {
  max-width: 420px;
  margin: auto auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.08);
  padding: 2.5rem 2rem 2rem 2rem;
}
.settings-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #232946;
  font-size: 2rem;
}
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.profile-pic-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}
.profile-pic-preview {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1976d2;
  margin-bottom: 0.5rem;
  background: #f4f6fb;
}
.upload-label {
  background: #1976d2;
  color: #fff;
  padding: 0.4rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.2rem;
  transition: background 0.2s;
  display: inline-block;
}
.upload-label:hover {
  background: #1251a3;
}
.upload-label input[type="file"] {
  display: none;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-row label {
  font-weight: 500;
  color: #232946;
  margin-bottom: 0.1rem;
}
.form-row input {
  padding: 0.6rem 0.9rem;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  font-size: 1rem;
  background: #f4f6fb;
  transition: border 0.2s;
}
.form-row input:focus {
  border: 1.5px solid #1976d2;
  outline: none;
}
.save-btn {
  margin-top: 1.2rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.7rem 0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #1251a3;
}
.message {
  text-align: center;
  margin-top: 1rem;
  color: #1976d2;
  font-weight: 500;
}
</style>
