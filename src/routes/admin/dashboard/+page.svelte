<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data: {
    residents: number;
    guards: number;
    vehicles: number;
    users: number;
    admins: number;
    guests: number;
    events: number;
    guestStats?: { date: string; count: number }[];
    activeGuestPasses: number;
    activeFoodDeliveryPasses: number;
    recentCarAccess: string;
    adminUsername?: string;
    adminProfilePic?: string;
  };

  let chart: Chart | null = null;
  let chartCanvas: HTMLCanvasElement | null = null;
  let issuedChart: Chart | null = null;
  let issuedCanvas: HTMLCanvasElement | null = null;
  // Chart range selection: '7d' | '1m' | '3m'
  let selectedRange: '7d' | '1m' | '3m' = '7d';

  const rangeToDays = (r: typeof selectedRange) => (r === '7d' ? 7 : r === '1m' ? 30 : 90);

  const getFilteredStats = (r: typeof selectedRange) => {
    if (!data?.guestStats || !data.guestStats.length) return [] as { date: string; count: number }[];
    const days = rangeToDays(r);
    // take last N entries (assumes guestStats is chronological)
    return data.guestStats.slice(Math.max(0, data.guestStats.length - days));
  };
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  interface QuickAction {
    title: string;
    description: string;
    link: string;
    color?: string;
    iconSvg?: string;
    iconPath?: string;
  }

  onMount(() => {
    if (data?.guestStats && chartCanvas) {
      if (chart) chart.destroy();
      chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: data.guestStats.map(g => g.date),
          datasets: [{
            label: 'Guests Issued',
            data: data.guestStats.map(g => g.count),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff'
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Date', color: '#6b7280' },
              grid: { display: false },
              ticks: { color: '#6b7280' }
            },
            y: {
              title: { display: true, text: 'Guests', color: '#6b7280' },
              beginAtZero: true,
              grid: { color: '#f3f4f6' },
              ticks: { color: '#6b7280' }
            }
          }
        }
      });

      onDestroy(() => {
        if (chart) {
          chart.destroy();
        }
      });
    }
  });

  const stats = [
    { label: 'Residents', value: data.residents, link: '/admin/dashboard/residents', icon: '👥' },
    { label: 'Guards', value: data.guards, link: '/admin/dashboard/guards', icon: '🛡️' },
    { label: 'Vehicles', value: data.vehicles, link: '/admin/dashboard/vehicles', icon: '🚗' },
    { label: 'Admins', value: data.admins, link: '/admin/dashboard/admins', icon: '👑' },
    { label: 'Guests', value: data.guests, link: '/admin/dashboard/guests', icon: '🎟️' },
    { label: 'Events', value: data.events, link: '/admin/dashboard/events', icon: '📈' }
  ];

  // Use SVG placeholders instead of emoji so icons are consistent across platforms
  const placeholderSvg = (stroke = '#ffffff') => `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
      <path d="M8 12h8" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;

  const quickActions: QuickAction[] = [
    // Using static SVG paths under /static/icons/ (dummy placeholders created)
    { title: 'Add Resident', description: 'Register a new resident', link: '/admin/dashboard/residents/create', iconPath: '/icons/add-resident.svg', color: 'bg-blue-500' },
  // the guests page includes an inline create form (POST ?/create), so link to it
  { title: 'Issue Guest Pass', description: 'Create a new guest pass', link: '/admin/dashboard/guests', iconPath: '/icons/issue-guest.svg', color: 'bg-green-500' },
    { title: 'Register Vehicle', description: 'Add a new vehicle', link: '/admin/dashboard/vehicles/create', iconPath: '/icons/register-vehicle.svg', color: 'bg-purple-500' },
    { title: 'View Reports', description: 'Access system reports', link: '/admin/dashboard/events', iconPath: '/icons/view-reports.svg', color: 'bg-orange-500' }
  ];

  // Total issued guest passes in the provided guestStats (last N days)
  const issuedCount = data?.guestStats ? data.guestStats.reduce((s, g) => s + (g.count || 0), 0) : 0;
  // initialize issued sparkline
  // We'll initialize both charts in the same onMount and clean both up in a single onDestroy
  onMount(() => {
    // main chart (Guests Issued over time)
    if (data?.guestStats && chartCanvas) {
      if (chart) chart.destroy();
      chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: data.guestStats.map(g => g.date),
          datasets: [{
            label: 'Guests Issued',
            data: data.guestStats.map(g => g.count),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff'
            }
          },
          scales: {
            x: { title: { display: true, text: 'Date', color: '#6b7280' }, grid: { display: false }, ticks: { color: '#6b7280' } },
            y: { title: { display: true, text: 'Guests', color: '#6b7280' }, beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { color: '#6b7280' } }
          }
        }
      });
    }

    // issued chart is created reactively below based on `selectedRange`.
  });

  onDestroy(() => {
    if (chart) chart.destroy();
    if (issuedChart) issuedChart.destroy();
  });

  // Re-create issuedChart whenever the selected range or data changes
  $: if (issuedCanvas && data?.guestStats) {
    const filtered = getFilteredStats(selectedRange);
    if (issuedChart) {
      issuedChart.destroy();
      issuedChart = null;
    }
    // graceful fallback when no data
    const labels = filtered.length ? filtered.map(g => g.date) : (data.guestStats || []).map(g => g.date).slice(-7);
    const values = filtered.length ? filtered.map(g => g.count) : (data.guestStats || []).map(g => g.count).slice(-7);

    issuedChart = new Chart(issuedCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Guests Issued',
          data: values,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.12)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#6366f1',
          pointRadius: 2,
          pointHoverRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { display: true, grid: { display: false }, ticks: { color: '#6b7280' } },
          y: { display: true, grid: { color: '#f3f4f6' }, ticks: { color: '#6b7280' }, beginAtZero: true }
        }
      }
    });
  }
</script>

<div class="dashboard-container">
  <!-- Compact Header (replaces large gradient hero) -->
  <header class="dashboard-overview">
    <div class="overview-left">
      <div class="overview-text">
        <h1 class="overview-title">Dashboard Overview</h1>
        <div class="overview-date">{dateString}</div>
      </div>
    </div>
    <div class="overview-right">
      <a href="/admin/dashboard/settings" class="overview-avatar-link" aria-label="Account settings">
        <img class="overview-avatar" src={data.adminProfilePic ?? '/default-profile.png'} alt="Profile" width="48" height="48" />
      </a>
    </div>
  </header>

  <!-- Issued Guest Passes (summary) -->
  <section class="issued-section">
    <div class="issued-card">
      <div style="display:flex; align-items:center; gap:1rem; width:100%; justify-content:space-between;">
        <div>
          <div class="issued-label">Issued Guest Passes</div>
          <div class="issued-value">{issuedCount}</div>
        </div>
        <div class="issued-range">
          <button class:active={selectedRange === '7d'} on:click={() => (selectedRange = '7d')}>7D</button>
          <button class:active={selectedRange === '1m'} on:click={() => (selectedRange = '1m')}>1M</button>
          <button class:active={selectedRange === '3m'} on:click={() => (selectedRange = '3m')}>3M</button>
        </div>
      </div>
      <div class="issued-chart-wrapper">
        <canvas bind:this={issuedCanvas} class="issued-canvas" aria-label="Issued guest passes chart"></canvas>
      </div>
    </div>
  </section>

  <!-- Quick Actions -->
  <section class="quick-actions-section">
    <h2 class="section-title">Quick Actions</h2>
    <div class="quick-actions-grid">
      {#each quickActions as action}
        <a href={action.link} class="quick-action-card">
          <div class="action-icon {action.color}">
            {#if action.iconSvg}
              {@html action.iconSvg}
            {:else if action.iconPath}
              <img src={action.iconPath} alt="" width="24" height="24" />
            {:else}
              <!-- fallback square -->
              {@html placeholderSvg()}
            {/if}
          </div>
          <div class="action-content">
            <h3 class="action-title">{action.title}</h3>
            <p class="action-description">{action.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  /* dashboard container spacing is handled globally in subpage.css */

  /* Dashboard overview header */
  .dashboard-overview {
    /* blend header into the page: no background, border, or shadow */
    background: transparent;
    border-radius: 0;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    display:flex;
    align-items:center;
    box-shadow: none;
    border: none;
  }
  .overview-left { display:flex; align-items:center; gap:0.75rem }
  .overview-text{ display:flex; flex-direction:column }
  .overview-title { font-size:1.25rem; font-weight:800; margin:0; color:#0b1220 }
  .overview-date { font-size:0.85rem; color:#6b7280 }
  .overview-right { margin-left:auto; display:flex; align-items:center }
  .overview-avatar{ width:64px; height:64px; border-radius:9999px; object-fit:cover; display:block; border:3px solid rgba(16,24,40,0.06); box-shadow:0 4px 12px rgba(16,24,40,0.06) }
  .overview-avatar-link { display:inline-block; line-height:0; border-radius:9999px; }
  .overview-avatar-link:hover .overview-avatar { transform: translateY(-3px) scale(1.04); box-shadow: 0 10px 30px rgba(2,6,23,0.08); }
  .overview-avatar { transition: transform 140ms cubic-bezier(.2,.9,.3,1), box-shadow 140ms cubic-bezier(.2,.9,.3,1); cursor: pointer; }

  /* Section Titles */
  .section-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 1.5rem 0;
  }

  /* Quick Actions */
  .quick-actions-section {
    margin-bottom: 3rem;
  }

  .issued-section { margin-bottom: 1.5rem; }
  .issued-card { display:flex; flex-direction:column; gap:0.75rem; background:transparent; padding:0.6rem 1rem; border-radius:12px; border:none; max-width:760px; }
  .issued-label { color:#6b7280; font-weight:600; }
  .issued-value { font-weight:700; font-size:1.25rem; color:#1f2937; }
  .issued-left { display:flex; flex-direction:column; gap:0.125rem; }
  .issued-chart-wrapper { width:100%; height:140px; }
  .issued-canvas { width:100%; height:100%; display:block; }

  .issued-range { display:flex; gap:0.5rem; }
  .issued-range button {
    background: transparent;
    border: 1px solid #e6eefc;
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    color: #374151;
    font-weight: 600;
    cursor: pointer;
    transition: all 120ms ease;
  }
  .issued-range button:hover { background: rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.12); }
  .issued-range button.active, .issued-range button.active:hover {
    background: #6366f1;
    color: #fff;
    border-color: #6366f1;
  }

  /* quick-action styles are provided by shared subpage.css to ensure consistent sizing */

  .action-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: white;
    flex-shrink: 0;
  }
  .action-icon img, .action-icon :global(svg) { width: 24px; height: 24px; display: block; }

  .quick-action-card {
    /* allow cards to shrink on small screens instead of forcing overflow */
    min-width: 0;
  }

  .action-content {
    flex: 1;
  }

  .action-title {
    font-size: 1rem;
    font-weight: 600; /* match global subpage.css */
    color: #1f2937;
    margin: 0;
  }

  .action-description {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
  }

  .action-arrow {
    font-size: 1.05rem;
    color: #9ca3af;
    transition: color 0.2s;
    align-self: center; /* vertically center in row layout */
    margin-left: 0.5rem;
    display: inline-flex;
    align-items: center;
  }

  .quick-action-card:hover .action-arrow {
    color: #6366f1;
  }

  /* Statistics */
  .stats-section {
    margin-bottom: 3rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .stat-icon {
    font-size: 2rem;
    opacity: 0.8;
  }

  .stat-value {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #1f2937;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }

  .stat-link {
    font-size: 0.9rem;
    color: #6366f1;
    font-weight: 500;
  }

  /* Charts and Activity Row */
  .charts-activity-row {
    display: grid;
    /* use minmax(0, *) to prevent overflow when children are large */
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  /* Chart Section */
  .chart-section {
    grid-column: 1;
  }

  .chart-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .chart-header {
    margin-bottom: 2rem;
  }

  .chart-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .chart-subtitle {
    color: #6b7280;
    margin: 0;
  }

  .chart-container {
    /* prefer aspect-ratio so charts scale naturally across widths */
    aspect-ratio: 16 / 9;
    height: auto;
    position: relative;
    width: 100%;
    max-width: 100%;
  }
  
  /* Activity Section */
  .activity-section {
    grid-column: 2;
  }

  .activity-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .activity-header {
    margin-bottom: 2rem;
  }

  .activity-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .activity-subtitle {
    color: #6b7280;
    margin: 0;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .activity-content {
    flex: 1;
  }

  .activity-text {
    font-size: 0.9rem;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .activity-time {
    font-size: 0.8rem;
    color: #6b7280;
    margin: 0;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .charts-activity-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .chart-section,
    .activity-section {
      grid-column: 1;
    }
  }

  @media (max-width: 768px) {
    .dashboard-container {
      padding: 1rem;
    }

    /* welcome-section removed in favor of compact-header; selectors cleaned up */

    /* keep quick actions two columns on smaller screens per request */
    .quick-actions-grid {
      grid-template-columns: 1fr 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      padding: 1rem;
    }

    .stat-value {
      font-size: 2rem;
    }

    .chart-card,
    .activity-card {
      padding: 1.5rem;
    }

    .chart-container {
      aspect-ratio: 4 / 3;
    }
  }

  @media (max-width: 480px) {
    .stats-grid { grid-template-columns: 1fr; }
    /* keep two columns on very small screens; reduce card padding to fit */
    .quick-actions-grid { gap: 0.5rem; }
    .quick-action-card { padding: 0.75rem 0.75rem; }
    .action-icon { width: 36px; height: 36px; font-size: 1.1rem; }
  }

  /* Mobile compact tweaks: clamp descriptions, reduce title size, and tighten spacing */
  @media (max-width: 420px) {
    .quick-action-card { padding: 0.6rem 0.6rem; gap: 0.6rem; min-height: 56px; }
    .action-icon { width: 32px; height: 32px; font-size: 1rem; }
    .action-title { font-size: 0.98rem; margin-bottom: 0.125rem; }
    .action-description {
      font-size: 0.78rem;
      color: #6b7280;
      margin: 0;
  /* clamp to one line with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .action-content { gap: 0.125rem; }
    .action-arrow { font-size: 1rem; }
  }
</style>
