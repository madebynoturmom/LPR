
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';
  let name = '';
  let email = '';
  let username = '';
  let password = '';
  let currentPassword = '';
  let newPassword = '';
  let passwordMessage = '';

  async function handlePasswordChange(event: Event) {
    event.preventDefault();
    // TODO: Implement password change logic (API call)
    if (!currentPassword || !newPassword) {
      passwordMessage = 'Please fill in both fields.';
      return;
    }
    // Simulate success
    passwordMessage = 'Password updated successfully!';
    currentPassword = '';
    newPassword = '';
  }
  let phone = '';

  let houseNumber = '';
  let carNumber = '';
  let profilePic: string | null = null;
  let message = '';

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePic = e.target?.result as string;
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    // TODO: Implement profile update logic (API call)
    message = 'Profile updated successfully!';
  }
</script>

<div class="profile-card move-up">
  <h1>Account Settings</h1>
  <div class="profile-forms-row">
    <div class="profile-settings-col">
      <form class="profile-form" on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
        <div class="profile-pic-section">
          <img src={profilePic || '/default-profile.png'} alt="Profile preview" class="profile-pic-preview" />
          <label for="profilePicture" class="upload-label">
            <span>Change Photo</span>
            <input id="profilePicture" type="file" accept="image/*" on:change={handleFileChange} />
          </label>
        </div>
        <div class="form-grid">
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
            <label for="phone">Phone</label>
            <input id="phone" type="text" bind:value={phone} />
          </div>
          <div class="form-row">
            <label for="houseNumber">House Number</label>
            <input id="houseNumber" type="text" bind:value={houseNumber} />
          </div>
          <div class="form-row">
            <label for="carNumber">Car Number</label>
            <input id="carNumber" type="text" bind:value={carNumber} />
          </div>
        </div>
        <button class="save-btn" type="submit">Save Changes</button>
        {#if message}
          <div class="message">{message}</div>
        {/if}
      </form>
    </div>
    <div class="password-col">
      <form class="password-form" on:submit|preventDefault={handlePasswordChange} autocomplete="off">
        <h2>Change Password</h2>
        <div class="form-row">
          <label for="currentPassword">Current Password</label>
          <input id="currentPassword" type="password" bind:value={currentPassword} required autocomplete="current-password" />
        </div>
        <div class="form-row">
          <label for="newPassword">New Password</label>
          <input id="newPassword" type="password" bind:value={newPassword} required autocomplete="new-password" />
        </div>
        <button class="save-btn password-btn" type="submit">Update Password</button>
        {#if passwordMessage}
          <div class="message">{passwordMessage}</div>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>

.profile-settings-col {
  min-width: 0;
}

.password-col {
  min-width: 270px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.profile-forms-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2.5rem;
  max-width: 800px;
  margin: 2rem auto 0 auto;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}
@media (max-width: 900px) {
  .profile-forms-row {
    display: block;
  }
  .password-col {
    max-width: 100%;
    margin-top: 1.5rem;
  }
}


.profile-card.move-up {
  max-width: 600px;
  margin: 1rem auto 2.5rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(25, 118, 210, 0.10);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 900px) {
  .profile-card.move-up {
    margin-top: 0.5rem;
    padding: 1.2rem 0.5rem;
  }
}

.profile-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  margin-bottom: 1.7rem;
}

@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem 0;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row label {
  font-size: 1.05rem;
  color: #232946;
  font-weight: 500;
}

.form-row input {
  padding: 0.7rem 1rem;
  border: 1.5px solid #d1d5db;
  border-radius: 7px;
  font-size: 1.08rem;
  background: #f8fafc;
  transition: border 0.2s;
}

.form-row input:focus {
  border: 1.5px solid #1976d2;
  outline: none;
}

.profile-pic-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.7rem;
}

.profile-pic-preview {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1976d2;
  margin-bottom: 0.7rem;
  background: #f4f6fb;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #1976d2;
  cursor: pointer;
  margin-top: 0.2rem;
}

.upload-label input[type="file"] {
  display: none;
}

.save-btn {
  margin-top: 1.2rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.9rem 0;
  border-radius: 9px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}

.save-btn:hover {
  background: #1251a3;
}

.password-btn {
  margin-top: 1.2rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.7rem 0;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}

.password-btn:hover {
  background: #1251a3;
}

.message {
  text-align: center;
  margin-top: 1.2rem;
  color: #1976d2;
  font-weight: 500;
}
</style>