<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';

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
  let stats = [
    { label: 'Residents', value: data.residents, link: '/admin/dashboard/residents' },
    { label: 'Guards', value: data.guards, link: '/admin/dashboard/guards' },
    { label: 'Vehicles', value: data.vehicles, link: '/admin/dashboard/vehicles' },
    { label: 'Admins', value: data.admins, link: '/admin/dashboard/admins' },
    { label: 'Guests', value: data.guests, link: '/admin/dashboard/guests' },
    { label: 'Events', value: data.events, link: '/admin/dashboard/events' }
  ];
  let navLinks = [
    { label: 'Dashboard', link: '/admin/dashboard' },
    { label: 'Residents', link: '/admin/dashboard/residents' },
    { label: 'Guards', link: '/admin/dashboard/guards' },
    { label: 'Vehicles', link: '/admin/dashboard/vehicles' },
    { label: 'Admins', link: '/admin/dashboard/admins' },
    { label: 'Guests', link: '/admin/dashboard/guests' },
    { label: 'Events', link: '/admin/dashboard/events' }
  ];
  // Logout handled by SvelteKit form POST below
  let chart: Chart;
  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
    if (data.guestStats && chartCanvas) {
      if (chart) chart.destroy();
      chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: data.guestStats.map(g => g.date),
          datasets: [{
            label: 'Guests Issued',
            data: data.guestStats.map(g => g.count),
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { x: { title: { display: true, text: 'Date' } }, y: { title: { display: true, text: 'Guests' }, beginAtZero: true } }
        }
      });
    }
  });

  const sidebarOpen = writable(false);

  function toggleSidebar() {
    sidebarOpen.update((value) => !value);
  }

  let userProfilePic = '/default-profile.png';
  let userName = 'Admin';

  export let recentActivity = {
    activeGuestPasses: data.activeGuestPasses,
    activeFoodDeliveryPasses: data.activeFoodDeliveryPasses,
    recentCarAccess: data.recentCarAccess
  };
</script>

<div class="admin-layout">
  <main class="dashboard-main">
    <h1 class="dashboard-title">Dashboard Overview</h1>
    <div class="recent-activity-card">
      <h3>Recent Activity</h3>
      <ul>
        <li><strong>Active Guest Passes:</strong> {recentActivity.activeGuestPasses}</li>
        <li><strong>Active Food Delivery Passes:</strong> {recentActivity.activeFoodDeliveryPasses}</li>
        <li><strong>Recent Car Access:</strong> {recentActivity.recentCarAccess}</li>
      </ul>
    </div>
    <div class="stats-grid">
      {#each stats as stat}
        <a href={stat.link} class="stat-card">
          <div class="stat-value">{stat.value}</div>
          <div class="stat-label">{stat.label}</div>
        </a>
      {/each}
    </div>
    <div class="guest-graph-card">
      <h2>Guest Passes Issued (Last 7 Days)</h2>
      <canvas bind:this={chartCanvas} width="600" height="220"></canvas>
    </div>
    <div class="dashboard-cards-row">
      <a href="/admin/dashboard/vehicles" class="dashboard-card">
        <h2>Vehicles</h2>
        <p>Manage registered vehicles.</p>
      </a>
      <a href="/admin/dashboard/guests" class="dashboard-card">
        <h2>Guest Passes</h2>
        <p>View and manage guest passes.</p>
      </a>
      <a href="/admin/dashboard/food-delivery" class="dashboard-card">
        <h2>Food Delivery</h2>
        <p>Grant access for food delivery riders.</p>
      </a>
    </div>
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
.dashboard-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.recent-activity-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.dashboard-cards-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.dashboard-card {
  flex: 1;
  min-width: 200px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.dashboard-card:hover {
  transform: scale(1.05);
}
@media (max-width: 900px) {
  .admin-layout {
    flex-direction: column;
    height: 100vh;
    min-height: 0;
  }
  .dashboard-main {
    padding: 1.5rem 0.5rem;
    height: calc(100vh - 0px);
    min-height: 0;
    overflow-y: auto;
  }
}
  .admin-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .admin-layout {
      flex-direction: row;
    }
  }

  .dashboard-main {
    flex: 3;
    padding: 1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .guest-graph-card {
    margin-top: 2rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {

    .dashboard-main {
      padding: 0.5rem;
    }

    .stat-card {
      padding: 0.5rem;
    }
  }


  .dashboard-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
</style>
