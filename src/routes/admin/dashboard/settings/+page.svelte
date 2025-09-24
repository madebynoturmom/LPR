<script lang="ts">
  import { page } from '$app/stores';

  // keep a small reactive reference for user data if subpages need it
  $: user = $page.data?.user;

  // lightweight placeholder file handler in case subpages import this component state
  let profilePic = '';
  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      profilePic = URL.createObjectURL(file);
    }
  }
</script>

<div class="dashboard-container">
  <header class="dashboard-overview">
    <div class="overview-left">
      <div class="overview-text">
        <h1 class="overview-title">Settings</h1>
        <div class="overview-date">Application settings & preferences</div>
      </div>
    </div>
  </header>

  <section class="settings-section">
    <div class="subpage-card">
      <div style="margin-top:1rem; max-width:720px;">
        <nav style="display:flex; flex-direction:column; gap:0.5rem;">
          <a href="/admin/dashboard/settings/account" class="settings-list-item">Account <span class="item-arrow">›</span></a>
          <a href="/admin/dashboard/settings/notifications" class="settings-list-item">Notifications <span class="item-arrow">›</span></a>
          <a href="/admin/dashboard/settings/appearance" class="settings-list-item">Appearance <span class="item-arrow">›</span></a>
          <a href="/admin/dashboard/settings/privacy" class="settings-list-item">Privacy &amp; Security <span class="item-arrow">›</span></a>
          <a href="/admin/dashboard/settings/help" class="settings-list-item">Help and Support <span class="item-arrow">›</span></a>
          <a href="/admin/dashboard/settings/about" class="settings-list-item">About <span class="item-arrow">›</span></a>
        </nav>
      </div>
    </div>
  </section>
</div>
<style>
  .settings-section { margin-top: 1rem; }
  /* reuse existing subpage/card classes where possible */
</style>
