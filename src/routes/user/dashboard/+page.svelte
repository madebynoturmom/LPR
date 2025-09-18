
<script lang="ts">
  // Optionally, fetch summary data here in the future
</script>

<h1 class="dashboard-title">Dashboard Overview</h1>

<div class="dashboard-cards-row">
  <div class="dashboard-card">
    <h2>Vehicles</h2>
    <p>Manage your registered vehicles.</p>
    <a href="/user/dashboard/vehicles" class="dashboard-btn">Go to Vehicles</a>
  </div>
  <div class="dashboard-card">
    <h2>Guest Passes</h2>
    <p>View and manage your guest passes.</p>
    <a href="/user/dashboard/guests" class="dashboard-btn">Go to Guest Passes</a>
  </div>
  <div class="dashboard-card">
    <h2>Food Delivery</h2>
    <p>Grant access for food delivery riders.</p>
    <a href="/user/dashboard/food-delivery" class="dashboard-btn">Go to Food Delivery</a>
  </div>
</div>

<style>
  :global(body) {
    overflow: hidden;
  }
  .dashboard-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 3rem;
    margin-left: 1rem;
    color: #232946;
  }
  .dashboard-cards-row {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    max-width: 100vw;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
  }
  .dashboard-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
    padding: 0.7rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 220px;
    max-width: 280px;
    flex: 1 1 220px;
    margin-left: 1rem;
  }
  .dashboard-card h2 {
    color: #175cd3;
    font-size: 1.15rem;
    margin: 0 0 0.2rem 0;
  }
  .dashboard-btn {
    background: #175cd3;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.35rem 1rem;
    font-size: 0.98rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    margin-top: 0.3rem;
    align-self: flex-start;
    transition: background 0.2s;
  }
  .dashboard-btn:hover {
    background: #143b7d;
  }
  @media (max-width: 1100px) {
    .dashboard-cards-row {
      flex-direction: column;
      margin-top: auto;
      align-items: stretch;
    }
    .dashboard-card {
      font-size: 1.5rem;
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