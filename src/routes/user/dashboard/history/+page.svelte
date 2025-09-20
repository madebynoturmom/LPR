<script lang="ts">
  export let data;
  let { pastPasses } = data;
</script>

<div class="history-page-container">
  <a href="/user/dashboard" class="back-btn">&larr; Back to Dashboard</a>
  <h2>Pass History</h2>
  <p class="history-description">View your past guest passes and food delivery passes that have expired or been revoked.</p>

  {#if pastPasses.length === 0}
    <p>No past passes found.</p>
  {:else}
    <div class="history-stats">
      <div class="stat-item">
        <span class="stat-number">{pastPasses.length}</span>
        <span class="stat-label">Total Past Passes</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{pastPasses.filter(p => p.reason === 'revoked').length}</span>
        <span class="stat-label">Manually Revoked</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{pastPasses.filter(p => p.reason === 'expired').length}</span>
        <span class="stat-label">Expired</span>
      </div>
    </div>

    <div class="passes-container">
      {#each pastPasses as pass}
        <div class="pass-card" class:revoked={pass.reason === 'revoked'} class:expired={pass.reason === 'expired'}>
          <div class="pass-header">
            <div class="pass-type">
              {pass.type === 'visitors' ? '👥 Guest Pass' : '🍕 Food Delivery'}
            </div>
            <div class="pass-status">
              {#if pass.reason === 'revoked'}
                <span class="status-badge revoked">Revoked</span>
              {:else}
                <span class="status-badge expired">Expired</span>
              {/if}
            </div>
          </div>

          <div class="pass-details">
            <div class="detail-row">
              <strong>Plate:</strong> {pass.plateNumber}
            </div>
            {#if pass.name}
              <div class="detail-row">
                <strong>Name:</strong> {pass.name}
              </div>
            {/if}
            {#if pass.phone}
              <div class="detail-row">
                <strong>Phone:</strong> {pass.phone}
              </div>
            {/if}
            <div class="detail-row">
              <strong>Visit Time:</strong> {new Date(pass.visitTime).toLocaleString()}
            </div>
            <div class="detail-row">
              <strong>Duration:</strong> {pass.durationMinutes} minutes
            </div>
            {#if pass.reason === 'revoked' && 'revokedAt' in pass}
              <div class="detail-row">
                <strong>Revoked At:</strong> {new Date((pass as any).revokedAt).toLocaleString()}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .history-page-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 800px;
    margin-left: 1rem;
    margin-right: auto;
    margin-top: 3rem;
    box-sizing: border-box;
  }

  .back-btn {
    display: inline-block;
    margin-bottom: 1.5rem;
    background: #e0e0e0;
    color: #000;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .back-btn:hover {
    background: #d0d0d0;
  }

  .history-description {
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }

  .history-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    min-width: 120px;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #1976d2;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
  }

  .passes-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 96%;
  }

  .pass-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .pass-card.expired {
    border-left: 4px solid #ff9800;
  }

  .pass-card.revoked {
    border-left: 4px solid #f44336;
  }

  .pass-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .pass-type {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .status-badge.revoked {
    background: #ffebee;
    color: #c62828;
  }

  .status-badge.expired {
    background: #fff3e0;
    color: #ef6c00;
  }

  .pass-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-row {
    display: flex;
    gap: 0.5rem;
  }

  .detail-row strong {
    min-width: 100px;
    color: #555;
  }

  @media (max-width: 600px) {
    .history-page-container {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    .history-stats {
      gap: 1rem;
    }

    .stat-item {
      min-width: 100px;
      padding: 0.75rem;
    }

    .pass-card {
      padding: 1rem;
    }

    .pass-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>