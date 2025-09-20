<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';

  const sidebarOpen = writable(false);

  function toggleSidebar() {
    sidebarOpen.update((value) => !value);
  }

  let navLinks = [
    { label: 'Dashboard', link: '/admin/dashboard' },
    { label: 'Residents', link: '/admin/dashboard/residents' },
    { label: 'Guards', link: '/admin/dashboard/guards' },
    { label: 'Vehicles', link: '/admin/dashboard/vehicles' },
    { label: 'Admins', link: '/admin/dashboard/admins' },
    { label: 'Guests', link: '/admin/dashboard/guests' },
    { label: 'Events', link: '/admin/dashboard/events' },
    { label: 'Settings', link: '/admin/dashboard/settings' }
  ];

  let userProfilePic = '/default-profile.png';
  let userName = 'Admin';
</script>

<div class="admin-layout">
  <button class="sidebar-toggle" on:click={toggleSidebar} aria-label="Open sidebar">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  {#if $sidebarOpen}
    <button
      type="button"
      class="sidebar-backdrop"
      on:click={toggleSidebar}
      aria-label="Close sidebar"
      tabindex="0"
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleSidebar(); } }}
    ></button>
  {/if}
  <aside class="sidebar" class:open={$sidebarOpen} aria-label="Sidebar Navigation">
    <div class="sidebar-content">
      <div class="user-profile">
        <img src={userProfilePic} alt={userName} class="profile-pic" />
        <div class="user-username">{userName}</div>
      </div>
      <nav class="sidebar-nav" aria-label="Main Navigation">
        {#each navLinks as nav}
          <a
            class="sidebar-link"
            href={nav.link}
            aria-current={$page.url.pathname === nav.link ? 'page' : undefined}
            class:active={$page.url.pathname === nav.link}
            on:click={() => { sidebarOpen.set(false); }}
          >{nav.label}</a>
        {/each}
      </nav>
      <div class="sidebar-bottom">
        <form class="logout-form-main" method="POST" action="/logout">
          <button class="logout-btn-main" type="submit">Logout</button>
        </form>
      </div>
    </div>
  </aside>
  <main class="dashboard-main">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    display: flex;
    flex-direction: row;
    height: 100vh;
    min-height: 0;
    width: 100vw;
    background: #f4f6fb;
  }
  .sidebar {
    width: 220px;
    background: #232946;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    box-shadow: 2px 0 8px rgba(0,0,0,0.08);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .sidebar-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    flex: 1 1 auto;
  }
  .sidebar-nav {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .sidebar-link {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    font-weight: 500;
    transition: background 0.2s;
  }
  .sidebar-link.active {
    background: #1976d2;
  }
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
  }
  .profile-pic {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.5rem;
    background: #fff;
    border: 2px solid #1976d2;
  }
  .user-username {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  .sidebar-bottom {
    margin-top: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 1.5rem;
  }
  .dashboard-main {
    flex: 1 1 0%;
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    padding: 2.5rem 2rem 2.5rem 2.5rem;
    background: #f4f6fb;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
  }
  @media (max-width: 900px) {
    .admin-layout {
      flex-direction: column;
      height: 100vh;
      min-height: 0;
    }
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(.4,0,.2,1);
      box-shadow: 2px 0 8px rgba(0,0,0,0.08);
    }
    .sidebar.open {
      transform: translateX(0);
    }
    .sidebar-toggle {
      display: block;
    }
    .dashboard-main {
      padding: 1.5rem 0.5rem;
      height: calc(100vh - 0px);
      min-height: 0;
      overflow-y: auto;
    }
  }
</style>