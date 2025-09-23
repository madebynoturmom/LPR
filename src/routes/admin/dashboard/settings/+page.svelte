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

<!-- styles moved to subpage.css -->
