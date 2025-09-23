<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const sidebarOpen = writable(false);

  interface NavLink { iconPath?: string; icon?: string; label: string; link: string }

  // Use iconPath to reference static SVGs in /static/icons/
  let navLinks: NavLink[] = [
    { iconPath: '/icons/house-icon.svg', label: 'Dashboard', link: '/admin/dashboard' },
    { iconPath: '/icons/users-icon.svg', label: 'Manage', link: '/admin/dashboard/manage' },
    { iconPath: '/icons/bolt-icon.svg', label: 'Settings', link: '/admin/dashboard/settings' }
  ];

  let userProfilePic = '/default-profile.png';
  let userName = 'Admin';
  let userRole = 'Administrator';

  // Load user data from page data
  $: userProfilePic = $page.data.user?.profilePic || '/default-profile.png';
  $: userName = $page.data.user?.name || 'Admin';
  $: userRole = $page.data.user?.role || 'Administrator';

  // Admin layout uses the dark theme by default (no runtime theme toggle)
</script>

<div class="admin-layout" class:sidebar-open={$sidebarOpen}>
  <!-- Left sidebar removed; bottom bar is the primary navigation now -->
  <main class="dashboard-main">
    <div class="dashboard-inner">
      <slot />
    </div>
  </main>
  <!-- Mobile bottom navigation (rendered for small screens via CSS) -->
  <div class="mobile-bottom-bar" aria-hidden="false">
    <nav class="mobile-nav" aria-label="Mobile Navigation">
      {#each navLinks as nav}
        <a href={nav.link} class:active={$page.url.pathname === nav.link}>
          {#if nav.iconPath}
            <img src={nav.iconPath} alt="" class="m-icon-img" width="20" height="20" />
          {:else}
            <span class="m-icon">{nav.icon}</span>
          {/if}
          <span class="m-label">{nav.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</div>

<svelte:head>
  <link rel="stylesheet" href="/admin/dashboard/subpage.css" />
</svelte:head>