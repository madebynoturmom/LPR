<script lang="ts">
  import type { GuestPass } from '$lib/server/db/schema';

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
</script>

<h1 class="dashboard-title">Dashboard Overview</h1>

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
      <div class="pass-item">
        <div class="pass-info">
          <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
          {#if pass.name}
            <div class="pass-detail">Name: {pass.name}</div>
          {/if}
          {#if pass.phone}
            <div class="pass-detail">Phone: {pass.phone}</div>
          {/if}
          <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
          <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
        </div>
        <div class="pass-actions">
          <a href="/user/dashboard/guests" class="manage-link">Manage</a>
        </div>
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
      <div class="pass-item">
        <div class="pass-info">
          <div class="pass-plate"><strong>{pass.plateNumber}</strong></div>
          {#if pass.name}
            <div class="pass-detail">Name: {pass.name}</div>
          {/if}
          {#if pass.phone}
            <div class="pass-detail">Phone: {pass.phone}</div>
          {/if}
          <div class="pass-detail">Visit: {new Date(pass.visitTime).toLocaleString()}</div>
          <div class="pass-detail">Duration: {pass.durationMinutes} minutes</div>
        </div>
        <div class="pass-actions">
          <a href="/user/dashboard/food-delivery" class="manage-link">Manage</a>
        </div>
      </div>
    {/each}
  </div>
</div>
{/if}

<div class="dashboard-cards-row">
  <a href="/user/dashboard/vehicles" class="dashboard-card">
    <h2>Vehicles</h2>
    <p>Manage your registered vehicles.</p>
  </a>
  <a href="/user/dashboard/guests" class="dashboard-card">
    <h2>Guest Passes</h2>
    <p>View and manage your guest passes.</p>
  </a>
  <a href="/user/dashboard/food-delivery" class="dashboard-card">
    <h2>Food Delivery</h2>
    <p>Grant access for food delivery riders.</p>
  </a>
</div>

<style>
  /* Removed global body overflow hidden to prevent layout issues */
  .dashboard-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 3rem;
    margin-left: 1rem;
    color: #232946;
  }
  .recent-activity-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 400px;
    flex: 1 1 auto; /* Added flex property */
  }
  .recent-activity-card h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #232946;
  }
  .recent-activity-card ul {
    list-style: none;
    padding: 0;
  }
  .recent-activity-card li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #232946;
  }
  .dashboard-cards-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Responsive design */
    gap: 0.5rem;
    max-width: 100%;
    margin-bottom: 1rem;
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
    max-width: 600px;
  }
  .active-passes-card h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #232946;
  }
  .passes-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .pass-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #175cd3;
  }
  .pass-info {
    flex: 1;
  }
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
  @media (max-width: 1100px) {
    .dashboard-cards-row {
      flex-direction: column;
      margin-top: auto;
      align-items: stretch;
    }
    .dashboard-card {
      font-size: 10;
      font-weight: 700;
      margin-bottom: 1rem;
      margin-top: 1rem;
      color: #232946;
    }
    .dashboard-title {
      font-size: 2rem;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      max-width: 100vw;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
  }
</style>