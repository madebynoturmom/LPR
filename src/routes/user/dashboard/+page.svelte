<script lang="ts">
  import type { GuestPass } from '$lib/server/db/schema';
  import { page } from '$app/stores';

  export let data: {
    recentActivity: {
      activeGuestPasses: number;
      activeFoodDeliveryPasses: number;
      recentCarAccess: string;
    };
    activeGuestPasses: GuestPass[];
    activeFoodDeliveryPasses: GuestPass[];
  };

  export let recentActivity = data.recentActivity;
  export let activeGuestPasses = data.activeGuestPasses;
  export let activeFoodDeliveryPasses = data.activeFoodDeliveryPasses;

  // UI state: which pass ids are expanded to show details
  let expandedPasses: Set<number | string> = new Set();

  function togglePass(id: number | string) {
    if (expandedPasses.has(id)) {
      expandedPasses.delete(id);
      // reassign to trigger Svelte reactivity
      expandedPasses = new Set(expandedPasses);
    } else {
      expandedPasses.add(id);
      expandedPasses = new Set(expandedPasses);
    }
  }

  const isExpanded = (id: number | string) => expandedPasses.has(id);
  import { slide } from 'svelte/transition';

  // reference to hero container so we can dispatch a DOM event that bubbles
  let heroEl: HTMLElement | null = null;

  function dispatchToggle() {
    const ev = new CustomEvent('toggleSidebar', { bubbles: true });
    heroEl?.dispatchEvent(ev);
  }

  // derive user name from page data when available
  $: userName = $page.data?.user?.name || 'Resident';
</script>

<!-- Move hero into the index page so subpages don't render it -->
<div class="dashboard-hero-page" bind:this={heroEl}>
  <div class="hero-inner-page">
    <button class="hero-hamburger-page" on:click={dispatchToggle} aria-label="Open sidebar">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <h1 class="hero-title-page">Dashboard Overview</h1>
  </div>
</div>

<div class="recent-activity-card">
  <h3>Recent Activity</h3>
  <ul>
    <li><strong>Active Guest Passes:</strong> {recentActivity.activeGuestPasses}</li>
    <li><strong>Active Food Delivery Passes:</strong> {recentActivity.activeFoodDeliveryPasses}</li>
    <li><strong>Recent Car Access:</strong> {recentActivity.recentCarAccess}</li>
  </ul>
</div>


{#if activeGuestPasses.length > 0}
<div class="active-passes-card">
  <h3>Your Active Guest Passes</h3>
  <div class="passes-list">
    {#each activeGuestPasses as pass}
      <div class="pass-item" on:click={() => togglePass(pass.id)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && togglePass(pass.id)} aria-expanded={isExpanded(pass.id)}>
        <div class="pass-summary">
          <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
          <div class="pass-meta">{pass.name ? pass.name : ''}</div>
        </div>
        <div class="pass-actions">
          <button class="manage-link" on:click|stopPropagation={() => { /* navigate to manage */ window.location.href = '/user/dashboard/guests'; }}>Manage</button>
        </div>
        {#if isExpanded(pass.id)}
          <div class="pass-details" transition:slide={{ duration: 180 }}>
            {#if pass.name}
              <div class="pass-detail">Name: {pass.name}</div>
            {/if}
            {#if pass.phone}
              <div class="pass-detail">Phone: {pass.phone}</div>
            {/if}
            <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
            <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
{/if}

{#if activeFoodDeliveryPasses.length > 0}
<div class="active-passes-card">
  <h3>Your Active Food Delivery Passes</h3>
  <div class="passes-list">
    {#each activeFoodDeliveryPasses as pass}
      <div class="pass-item" on:click={() => togglePass(pass.id)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && togglePass(pass.id)} aria-expanded={isExpanded(pass.id)}>
        <div class="pass-summary">
          <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
          <div class="pass-meta">{pass.name ? pass.name : ''}</div>
        </div>
        <div class="pass-actions">
          <button class="manage-link" on:click|stopPropagation={() => { window.location.href = '/user/dashboard/food-delivery'; }}>Manage</button>
        </div>
        {#if isExpanded(pass.id)}
          <div class="pass-details" transition:slide={{ duration: 180 }}>
            {#if pass.name}
              <div class="pass-detail">Name: {pass.name}</div>
            {/if}
            {#if pass.phone}
              <div class="pass-detail">Phone: {pass.phone}</div>
            {/if}
            <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
            <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
{/if}

<h3 class="quick-actions">Quick Actions</h3>

<div class="dashboard-cards-row">
  <a href="/user/dashboard/vehicles" class="dashboard-card">
    <div class="card-icon">🚗</div>
    <h2>Vehicles</h2>
    <p>Manage your registered vehicles.</p>
  </a>
  <a href="/user/dashboard/guests" class="dashboard-card">
    <div class="card-icon">👤</div>
    <h2>Guest Passes</h2>
    <p>View and manage your guest passes.</p>
  </a>
  <a href="/user/dashboard/food-delivery" class="dashboard-card">
    <div class="card-icon">🍱</div>
    <h2>Food Delivery</h2>
    <p>Grant access for food delivery riders.</p>
  </a>
</div>

<style>

  /* recent activity: responsive container that never overflows horizontally */
  .recent-activity-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin: 0 auto 2rem auto;
    width: 100%;
    max-width: 760px;
    box-sizing: border-box;
    overflow-wrap: anywhere;
  }
  .recent-activity-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: #232946;
    padding-left: 0; /* avoid adding extra width on small screens */
  }
  .recent-activity-card ul {
    list-style: none;
    padding: 0;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }
  /* Be defensive: make sure list items wrap instead of stretch container */
  .recent-activity-card li { overflow-wrap: break-word; word-break: break-word; }
  .recent-activity-card li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #232946;
  }
  .dashboard-cards-row {
    display: grid;
    grid-template-columns: 1fr; /* default mobile: single column */
    gap: 1rem;
    max-width: 960px;
    margin: 0 auto 1rem auto;
    padding-inline: clamp(12px, 4vw, 32px);
    align-items: stretch;
    box-sizing: border-box;
    width: 100%;
  }
  .dashboard-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.2rem; /* Adjusted spacing */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  align-items: center; /* Center content */
    cursor: pointer; /* Make cards clickable */
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none; /* Remove underline from links */
    color: inherit; /* Inherit text color */
    min-height: 120px; /* ensure visual consistency */
    width: 100%;
    min-width: 0; /* prevent overflowing due to long children */
    box-sizing: border-box;
  }
  .dashboard-card .card-icon {
    font-size: 1.4rem;
    display: block;
    margin: 0 auto 0.35rem auto;
  }
  .dashboard-card:hover {
    transform: scale(1.05); /* Add hover effect */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  .dashboard-card h2 {
    font-size: 1rem;
    color: #175cd3;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 1rem;
    justify-content: flex-start; /* Moved header to the left */
  }
  .dashboard-card h2::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .dashboard-card:nth-child(1) h2::before {
    background-image: url('/static/icons/vehicles.svg'); /* Icon for Vehicles */
  }
  .dashboard-card:nth-child(2) h2::before {
    background-image: url('/static/icons/guest-passes.svg'); /* Icon for Guest Passes */
  }
  .dashboard-card:nth-child(3) h2::before {
    background-image: url('/static/icons/food-delivery.svg'); /* Icon for Food Delivery */
  }
  .active-passes-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 880px;
    margin-left: auto;
    margin-right: auto;
  }
  .active-passes-card h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #232946;
  }
  .passes-list {
    margin: 0 auto 2rem auto;
    width: 100%;
    max-width: 760px; /* center and allow slightly wider cards */
    padding-inline: clamp(12px, 4vw, 32px);
    gap: 0.75rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .pass-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #175cd3;
    gap: 0.75rem;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden; /* prevent content from forcing horizontal scroll */
    min-height: 64px;
  }
  .pass-summary { display:flex; align-items:center; gap:0.75rem; flex: 1 1 auto; min-width: 0; }
  .pass-plate { font-size: 1.05rem; color: #123; margin-right: 0.5rem; flex: 0 0 auto; }
  .pass-meta { color: #555; font-size: 0.95rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1 1 auto; min-width: 0; }
  .pass-details { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.04); }
  .pass-details { overflow: hidden; }
  .pass-info { flex: 1 1 auto; min-width: 0; }
  .pass-actions { display:flex; align-items:center; flex: 0 0 auto; margin-left: 0; }
  .manage-link { background: transparent; border: 1px solid #1976d2; color:#1976d2; padding:0.35rem 0.65rem; border-radius:8px; cursor:pointer; white-space:nowrap; }
  .manage-link:hover { background:#eaf2ff; }
  .pass-plate {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #232946;
  }
  .pass-detail {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  .pass-actions {
    margin-left: 1rem;
  }
  .manage-link {
    color: #175cd3;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: 1px solid #175cd3;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  .manage-link:hover {
    background-color: #175cd3;
    color: white;
  }
  @media (max-width: 720px) {
    .dashboard-cards-row {
      grid-template-columns: 1fr; /* single column on narrow viewports */
      gap: 1rem;
      padding: 0 1rem;
    }
    .dashboard-card {
      margin: 0 auto;
      width: 100%;
      max-width: 520px; /* limit card width so it doesn't hug the right edge */
      color: #232946;
    }
    /* stack pass items vertically on small screens to avoid tight horizontal space */
    .pass-item { flex-direction: column; align-items: stretch; }
    .pass-summary { justify-content: space-between; }
    .pass-meta { white-space: normal; }
  }

  @media (min-width: 721px) {
    .dashboard-cards-row {
      grid-template-columns: repeat(2, 1fr); /* 2 columns on tablet+ */
      max-width: 960px;
    }
    .dashboard-card { display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding: 2rem; }
    .dashboard-card h2 { padding-left: 0; }
    .recent-activity-card { max-width: 600px; }
  }

  /* Quick actions header */
  .quick-actions { max-width: 960px; margin: 1.25rem auto 0.5rem auto; padding: 0 1rem; font-size: 1.1rem; color: #111827; }

  /* Hero (page-level) */
  .dashboard-hero-page {
    width: 100%;
    margin: 0 0 1.25rem 0;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .hero-inner-page {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
  }

  .hero-title-page {
    font-size: 1.25rem;
    margin: 0;
    color: #111827;
  }
  .hero-hamburger-page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.06);
    cursor: pointer;
  }
  .hero-hamburger-page:active { transform: scale(0.98); }
</style>