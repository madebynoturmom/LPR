<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';

  let name = '';
  let email = '';
  let username = '';
  let password = '';
  let profilePic = '';
  let file: File | null = null;

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
</script>


<div class="settings-container">
  <form class="settings-form" method="POST" enctype="multipart/form-data" use:enhance>
      

  <div class="subpage-container settings-subpage">
  <div class="subpage-card settings-card">
          <div class="subpage-header">
            <h1 class="subpage-title">Account Settings</h1>
          </div>
          <div class="profile-pic-section">
            <img src={profilePic || '/default-profile.png'} alt="Profile preview" class="profile-pic-preview" />
            <label for="profilePicture" class="upload-label">Change Photo
              <input id="profilePicture" name="profilePicture" type="file" accept="image/*" on:change={handleFileChange} />
            </label>
          </div>
          <div class="form-row">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" bind:value={username} required />
          </div>
          <div class="form-row">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" bind:value={name} required />
          </div>
          <div class="form-row">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" bind:value={email} required />
          </div>
          <div class="form-row">
            <label for="password">New Password</label>
            <input id="password" name="password" type="password" bind:value={password} placeholder="Leave blank to keep current password" autocomplete="new-password" />
          </div>
          <button class="save-btn" type="submit">Save Changes</button>
          {#if $page.form?.success}
            <p class="message success">Account updated successfully!</p>
          {/if}
          {#if $page.form?.error}
            <p class="message error">{$page.form.error}</p>
          {/if}
        </div>
      </div>
  </form>
</div>

<style>
.settings-container {
  width: 100%;
  max-width: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2.5rem 1rem; /* more vertical breathing room */
  box-sizing: border-box;
}

.subpage-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 18px 48px rgba(17,24,39,0.08);
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 520px; /* comfortable card measure */
  width: 100%;
  margin: 0 auto;
}

.subpage-header { text-align: center; margin-bottom: 0.6rem; }
.subpage-title { color: #232946; font-size: 2.6rem; margin: 0 0 0.5rem 0; font-weight: 800; line-height: 1; }
.settings-form { display: flex; flex-direction: column; gap: 1.25rem; width: 100%; align-items: stretch; }
.profile-pic-section { display:flex; flex-direction:column; align-items:center; margin-bottom: 0.6rem; }
.profile-pic-preview { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 5px solid #1976d2; margin-bottom: 0.9rem; background: #f4f6fb; }
.upload-label { background: #1976d2; color: #fff; padding: 0.5rem 1.4rem; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-top: 0.25rem; transition: background 0.2s; display: inline-block; }
.upload-label:hover { background: #1251a3; }
.upload-label input[type="file"] { display: none; }



.message { text-align:center; margin-top:1rem; font-weight:500; }
.message.success { color:#4caf50; }
.message.error { color:#f44336; }

@media (max-width: 640px) {
  .subpage-title { font-size: 1.6rem; }
  .profile-pic-preview { width: 120px; height: 120px; }
  .subpage-card { padding-right: 1.25rem; }
}
</style>
