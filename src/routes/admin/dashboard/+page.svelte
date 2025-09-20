<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { page } from '$app/stores';

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
    }
  });

  const stats = [
    {
      label: 'Residents',
      value: data.residents,
      link: '/admin/dashboard/residents',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Guards',
      value: data.guards,
      link: '/admin/dashboard/guards',
      icon: '🛡️',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Vehicles',
      value: data.vehicles,
      link: '/admin/dashboard/vehicles',
      icon: '🚗',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Admins',
      value: data.admins,
      link: '/admin/dashboard/admins',
      icon: '👑',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      label: 'Guests',
      value: data.guests,
      link: '/admin/dashboard/guests',
      icon: '🎫',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      label: 'Events',
      value: data.events,
      link: '/admin/dashboard/events',
      icon: '📊',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ];

  const quickActions = [
    {
      title: 'Add Resident',
      description: 'Register a new resident',
      link: '/admin/dashboard/residents/create',
      icon: '➕',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Issue Guest Pass',
      description: 'Create a new guest pass',
      link: '/admin/dashboard/guests/create',
      icon: '🎫',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Register Vehicle',
      description: 'Add a new vehicle',
      link: '/admin/dashboard/vehicles/create',
      icon: '🚗',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'View Reports',
      description: 'Access system reports',
      link: '/admin/dashboard/events',
      icon: '📈',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];
</script>

<div class="dashboard-container">
  <!-- Welcome Header -->
  <div class="welcome-section">
    <div class="welcome-content">
      <h1 class="dashboard-title">Welcome back, Admin! 👋</h1>
      <p class="dashboard-subtitle">Here's what's happening in your community today</p>
    </div>
    <div class="date-display">
      <div class="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  </div>

  <!-- Quick Actions -->
  <section class="quick-actions-section">
    <h2 class="section-title">Quick Actions</h2>
    <div class="quick-actions-grid">
      {#each quickActions as action}
        <a href={action.link} class="quick-action-card">
          <div class="action-icon {action.color}">{action.icon}</div>
          <div class="action-content">
            <h3 class="action-title">{action.title}</h3>
            <p class="action-description">{action.description}</p>
          </div>
          <div class="action-arrow">→</div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Statistics Overview -->
  <section class="stats-section">
    <h2 class="section-title">System Overview</h2>
    <div class="stats-grid">
      {#each stats as stat}
        <a href={stat.link} class="stat-card">
          <div class="stat-header">
            <div class="stat-icon">{stat.icon}</div>
            <div class="stat-value">{stat.value}</div>
          </div>
          <div class="stat-label">{stat.label}</div>
          <div class="stat-link">View Details →</div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Charts and Activity -->
  <div class="charts-activity-row">
    <!-- Guest Statistics Chart -->
    <section class="chart-section">
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Guest Passes Trend</h3>
          <p class="chart-subtitle">Last 7 days activity</p>
        </div>
        <div class="chart-container">
          <canvas bind:this={chartCanvas}></canvas>
        </div>
      </div>
    </section>

    <!-- Recent Activity -->
    <section class="activity-section">
      <div class="activity-card">
        <div class="activity-header">
          <h3 class="activity-title">Recent Activity</h3>
          <p class="activity-subtitle">Live updates</p>
        </div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon bg-green-100 text-green-600">🎫</div>
            <div class="activity-content">
              <p class="activity-text"><strong>{data.activeGuestPasses}</strong> active guest passes</p>
              <p class="activity-time">Currently valid</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon bg-blue-100 text-blue-600">🍕</div>
            <div class="activity-content">
              <p class="activity-text"><strong>{data.activeFoodDeliveryPasses}</strong> food delivery passes</p>
              <p class="activity-time">Active today</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon bg-purple-100 text-purple-600">🚗</div>
            <div class="activity-content">
              <p class="activity-text">Recent vehicle access</p>
              <p class="activity-time">{data.recentCarAccess}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .dashboard-container {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    background: #f8fafc;
    min-height: 100vh;
  }

  /* Welcome Section */
  .welcome-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
  }

  .welcome-content h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .welcome-content p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }

  .date-display {
    text-align: right;
  }

  .date {
    font-size: 1.1rem;
    font-weight: 500;
    opacity: 0.9;
  }

  /* Section Titles */
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 1.5rem 0;
  }

  /* Quick Actions */
  .quick-actions-section {
    margin-bottom: 3rem;
  }

  .quick-actions-grid {
    display: grid;
    /* use auto-fit so cards wrap responsively and avoid horizontal overflow */
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    align-items: start;
  }

  .quick-action-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .quick-action-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .action-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    flex-shrink: 0;
  }

  .quick-action-card {
    /* allow cards to shrink on small screens instead of forcing overflow */
    min-width: 0;
  }

  .action-content {
    flex: 1;
  }

  .action-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .action-description {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
  }

  .action-arrow {
    font-size: 1.2rem;
    color: #9ca3af;
    transition: color 0.2s;
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

    .welcome-section {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      padding: 1.5rem;
    }

    .welcome-content h1 {
      font-size: 2rem;
    }

    .quick-actions-grid {
      grid-template-columns: 1fr;
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
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .quick-action-card {
      padding: 1rem;
    }

    .action-icon {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }
  }
</style>
