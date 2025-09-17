<script>
  export let data;
  let guards = data?.guards ?? [];
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
  <div class="add-guard-btn-container">
    <a href="/admin/dashboard/guards/create" class="add-guard-btn">+ Add Guard</a>
  </div>
  <h2>Manage Guards</h2>
  <h3>Guards List</h3>
  {#if guards.length > 0}
    <table class="guard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Guard ID</th>
        </tr>
      </thead>
      <tbody>
        {#each guards as guard}
          <tr>
            <td>{guard.name ?? '-'}</td>
            <td>{guard.phone ?? '-'}</td>
            <td>{guard.guardId ?? '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>

  {:else}
    <p>No guards found.</p>
  {/if}
  </section>

<!-- All CSS moved to the style block below -->

<style>
.admin-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.add-guard-btn {
  display: inline-block;
  margin-bottom: 2rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
  text-align: center;
}
.add-guard-btn:hover {
  background: #1565c0;
}
.add-guard-btn-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.guard-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
.guard-table th, .guard-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.guard-table th {
  background: #f7f8fa;
  font-weight: 600;
}
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
</style>
