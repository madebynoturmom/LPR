
<script>
  export let data;
  let events = data?.events ?? [];
</script>

 

<div class="subpage-container">
  <div class="subpage-card">
    <div class="subpage-header">
      <div>
        <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
        <h2 class="subpage-title">Event Logs</h2>
      </div>
    </div>
  {#if events.length > 0}
    <table class="event-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>User</th>
          <th>Details</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {#each events as event}
          <tr>
            <td>{event.type}</td>
            <td>{event.userName}</td>
            <td>{event.details}</td>
            <td>{event.time}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No event logs found.</p>
  {/if}
  </div>
</div>

<style>
.back-btn {
  margin-bottom: 1rem;
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.back-btn:hover {
  background: #ddd;
}
.event-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
.event-table th, .event-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.event-table th {
  background: #f7f8fa;
  font-weight: 600;
}
</style>