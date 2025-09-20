<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const sidebarOpen = writable(false);

  function toggleSidebar() {
    sidebarOpen.update((v) => !v);
  }

  let navLinks = [
    { label: 'Dashboard', link: '/user/dashboard' },
    { label: 'Profile', link: '/user/dashboard/profile' },
    { label: 'Vehicles', link: '/user/dashboard/vehicles' },
    { label: 'Guest Passes', link: '/user/dashboard/guests' },
    { label: 'Food Delivery', link: '/user/dashboard/food-delivery' },
    { label: 'Pass History', link: '/user/dashboard/history' }
  ];

  // user profile from page data
  let userProfilePic = '/default-profile.png';
  let userName = 'Resident';
  $: userProfilePic = $page.data.user?.profilePic || '/default-profile.png';
  $: userName = $page.data.user?.name || 'Resident';

  // Listen for a bubbling CustomEvent('toggleSidebar') dispatched from page-level components (hero hamburger)
  onMount(() => {
    const handler = () => toggleSidebar();
    document.addEventListener('toggleSidebar', handler as EventListener);
    return () => document.removeEventListener('toggleSidebar', handler as EventListener);
  });
</script>

<div class="admin-layout" class:sidebar-open={$sidebarOpen}>
  <button class="top-toggle" on:click={toggleSidebar} aria-label="Open sidebar">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>

  <button
    type="button"
    class="sidebar-backdrop"
    class:visible={$sidebarOpen}
    on:click={toggleSidebar}
    aria-label="Close sidebar"
    tabindex="0"
    on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleSidebar(); } }}
  ></button>

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
  /* admin-like sidebar styles for user dashboard */
  .admin-layout {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    min-height: 0;
    width: 100%;
    background: #f4f6fb;
    overflow-x: hidden;
  }
  .sidebar {
    width: 280px;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    box-shadow: 4px 0 20px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  .sidebar.open { transform: translateX(0); }
  .sidebar-content { display:flex; flex-direction:column; height:100%; padding:2rem 1.5rem; }
  .sidebar-nav { flex:1 1 auto; display:flex; flex-direction:column; gap:0.5rem; margin-top:2rem; }
  .sidebar-link { display:block; color:#e2e8f0; text-decoration:none; padding:0.875rem 1rem; border-radius:8px; font-weight:500; transition:all .2s; }
  .sidebar-link:hover { background: rgba(99,102,241,0.1); color:#c7d2fe; }
  .sidebar-link.active { background:#6366f1; color:#fff; box-shadow:0 4px 12px rgba(99,102,241,0.3); }
  .top-toggle { position: fixed; top:1rem; left:1rem; z-index:1001; background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:0.75rem; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.1); display:none; }
  .top-toggle:hover { background:#f8fafc; box-shadow:0 4px 12px rgba(0,0,0,0.15); }
  .sidebar-backdrop { position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:999; border:none; cursor:default; opacity:0; pointer-events:none; transition:opacity .3s ease; }
  .sidebar-backdrop.visible { opacity:1; pointer-events:auto; }
  .user-profile { display:flex; flex-direction:column; align-items:center; padding:1rem; background: rgba(255,255,255,0.05); border-radius:12px; margin-bottom:1rem; }
  .profile-pic { width:64px; height:64px; border-radius:50%; object-fit:cover; margin-bottom:0.75rem; background:#fff; border:3px solid #6366f1; box-shadow:0 4px 12px rgba(99,102,241,0.2); }
  .user-username { font-weight:600; font-size:1.1rem; margin-bottom:0.5rem; color:#f1f5f9; }
  .sidebar-bottom { margin-top:auto; width:100%; display:flex; flex-direction:column; gap:1rem; padding-top:2rem; }
  .logout-form-main { width:100%; }
  .logout-btn-main { width:100%; background: rgba(239,68,68,0.1); color:#fca5a5; border:1px solid rgba(239,68,68,0.2); padding:0.75rem 1rem; border-radius:8px; font-weight:500; cursor:pointer; transition:all 0.2s; }
  .logout-btn-main:hover { background: rgba(239,68,68,0.2); color:#fecaca; }
  .dashboard-main { flex:1 1 0%; min-width:0; min-height:0; overflow-y:auto; padding:0; background:#f8fafc; min-height:100vh; display:flex; flex-direction:column; align-items:flex-start; box-sizing:border-box; }
  /* The sidebar is fixed and should overlay the main content.
    Remove the shifting margin so the dashboard is not pushed when
    the sidebar opens. */
  .admin-layout.sidebar-open .dashboard-main { margin-left: 0; }
  @media (max-width:900px) {
    .admin-layout { flex-direction:column; height:100vh; min-height:0; }
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .top-toggle { display:block; }
    .admin-layout.sidebar-open .top-toggle { display:none; }
    .dashboard-main { padding:0; min-height:0; overflow-y:auto; background:#f8fafc; margin-left:0; }
  }
  /* Design tokens */
  :root {
  flex-direction: row;
  min-height: 100vh;
  width: 100%; /* avoid 100vw to prevent horizontal scroll */
  background: #f4f6fb;
  overflow-x: hidden;
}
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  min-width: 0;
  min-height: 0;
  box-shadow: 4px 0 20px rgba(0,0,0,0.08);
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
.sidebar-link[aria-current="page"] {
  background: #1976d2;
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
    padding: 0; /* hero band handles top padding */
    background: var(--bg, #f4f6fb);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  }

  /* Design tokens */
  :root {
    --bg: #f4f6fb;
    --card-bg: #ffffff;
    --muted: #6b7280;
    --accent: #1976d2;
    --surface-shadow: 0 10px 30px rgba(16,24,40,0.06);
  }

  /* hero is page-level now (moved into +page.svelte) */

  /* Main content container that holds cards and subpage cards */

  @media (max-width: 900px) {
    .dashboard-main {
      padding: 1.5rem 0.8rem 1.5rem 1.2rem;
      height: calc(100vh - 0px);
      min-height: 0;
      overflow-y: auto;
    }
  }
.logout-form-main {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}
.logout-btn-main {
  background: #e57373;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.logout-btn-main:hover {
  background: #b00;
}
.top-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: #fff;
  color: #232946;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  border-radius: 8px;
  z-index: 1101;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s;
}
.top-toggle:hover { background: #f8fafc; }
.top-toggle svg { width: 20px; height: 20px; }
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  z-index: 999;
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.sidebar-backdrop:focus {
  outline: 2px solid #1976d2;
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
  .top-toggle {
    display: none; /* hide desktop toggle on small screens */
  }
  /* hero moved to page-level; no layout-specific hero styles here */
  .dashboard-main {
    padding: 0;
    height: calc(100vh - 0px);
    min-height: 0;
    overflow-y: auto;
  }
}
</style>
