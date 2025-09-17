<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  export let data: {
    residents: number;
    guards: number;
    vehicles: number;
    users: number;
    guests: number;
    events: number;
    guestStats?: { date: string; count: number }[];
    adminUsername?: string;
    adminProfilePic?: string;
  };
  let stats = [
    { label: 'Residents', value: data.residents, link: '/admin/dashboard/residents' },
    { label: 'Guards', value: data.guards, link: '/admin/dashboard/guards' },
    { label: 'Vehicles', value: data.vehicles, link: '/admin/dashboard/vehicles' },
    { label: 'Admins', value: data.users, link: '/admin/dashboard/admins' },
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
</script>

<div class="admin-layout">
  <form method="POST" action="/logout" class="logout-form">
    <button class="logout-btn" type="submit">Logout</button>
  </form>
  <aside class="sidebar">
    <div class="admin-profile">
      {#if data.adminProfilePic}
        <img src={data.adminProfilePic} alt={data.adminUsername ?? 'Admin'} class="profile-pic" />
      {:else}
        <div class="profile-pic placeholder">{data.adminUsername?.charAt(0)?.toUpperCase() ?? 'A'}</div>
      {/if}
      <div class="admin-username">{data.adminUsername ?? 'Admin'}</div>
    </div>
    <nav>
      {#each navLinks as nav}
        <a href={nav.link} class="sidebar-link">{nav.label}</a>
      {/each}
    </nav>
    <a href="/admin/dashboard/settings" class="settings-icon" title="Account Settings" aria-label="Account Settings">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#232946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.6 5a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 5.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"/></svg>
    </a>
  </aside>
  <main class="dashboard-main">
    <h1>Dashboard Overview</h1>
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
  </main>
</div>

<style>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6fb;
}
.sidebar {
  width: 220px;
  background: #232946;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
}
.admin-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}
.profile-pic {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  border: 2px solid #1976d2;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #232946;
}
.profile-pic.placeholder {
  background: #1976d2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 700;
}
.admin-username {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
  text-align: center;
  word-break: break-all;
}

.sidebar-link {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;
}
.sidebar-link:hover {
  background: #393e6e;
}
.logout-btn {
  margin-top: 2rem;
  background: #e57373;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  align-self: stretch;
}
.logout-btn:hover {
  background: #c62828;
}
.dashboard-main {
  flex: 1;
  padding: 3rem 2rem;
}
.dashboard-main h1 {
  margin-bottom: 2rem;
  color: #232946;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}
.stat-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 2rem 1.5rem;
  text-align: center;
  text-decoration: none;
  color: #232946;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-card:hover {
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.12);
  transform: translateY(-2px) scale(1.03);
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.stat-label {
  font-size: 1.1rem;
  color: #555;
}
.guest-graph-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 2rem 1.5rem;
  margin-top: 2rem;
  max-width: 700px;
}
.guest-graph-card h2 {
  margin-bottom: 1rem;
}
@media (max-width: 900px) {
  .admin-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 0.5rem;
  }
  .dashboard-main {
    padding: 2rem 0.5rem;
  }
}
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    position: relative;
  }
  .settings-icon {
    margin-top: auto;
    margin-bottom: 1.5rem;
    align-self: center;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 8px;
    transition: box-shadow 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    z-index: 10;
  }
  .settings-icon:hover {
    background: #e3e6f0;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.12);
  }
  .logout-form {
    position: absolute;
    top: 24px;
    right: 32px;
    z-index: 20;
  }
  .logout-btn {
    margin-top: 0;
  }
  .settings-icon {
    align-self: flex-end;
    margin-bottom: 1.2rem;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 8px;
    transition: box-shadow 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    z-index: 10;
  }
  .settings-icon:hover {
    background: #e3e6f0;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.12);
  }
</style>
