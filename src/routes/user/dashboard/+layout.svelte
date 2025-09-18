<script lang="ts">
  let sidebarOpen = false;
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  import './logout-button.css';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  // Sidebar navigation links for user dashboard
   // Use $page in template for reactivity
   // This allows the sidebar link highlighting to work reactively
 
  let navLinks = [
    { label: 'Dashboard', link: '/user/dashboard' },
    { label: 'Profile', link: '/user/dashboard/profile' },
    { label: 'Vehicles', link: '/user/dashboard/vehicles' },
    { label: 'Guest Passes', link: '/user/dashboard/guests' },
    { label: 'Food Delivery', link: '/user/dashboard/food-delivery' }
  ];
  // Dummy user info, replace with real user data if available
  let userProfilePic = '/default-profile.png';
  let userName = 'Resident';
</script>

<div class="user-layout">
  <button class="sidebar-toggle" on:click={toggleSidebar} aria-label="Open sidebar">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  {#if sidebarOpen}
    <button
      type="button"
      class="sidebar-backdrop"
      on:click={toggleSidebar}
      aria-label="Close sidebar"
      tabindex="0"
      on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleSidebar(); } }}
    ></button>
  {/if}
  <aside class="sidebar" class:open={sidebarOpen} aria-label="Sidebar Navigation">
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
            on:click={() => { sidebarOpen = false; }}
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
.user-layout {
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
  position: relative;
  z-index: 1000;
  min-width: 0;
  min-height: 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
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
    padding: 2.5rem 2rem 2.5rem 2.5rem;
    background: #f4f6fb;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
  }

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
.sidebar-toggle {
  display: none;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  z-index: 1100;
  cursor: pointer;
}
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
  .user-layout {
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
