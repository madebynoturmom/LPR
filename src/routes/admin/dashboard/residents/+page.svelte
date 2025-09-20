<script lang="ts">
  export let data;
  let residents = data?.residents ?? [];
  let error = null;
  let success = null;
  async function deleteResident(id: string) {
    if (confirm('Are you sure you want to delete this resident?')) {
      const res = await fetch(`/admin/dashboard/residents/${id}/delete`, { method: 'POST' });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete resident.');
      }
    }
  }
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
  <h2>Manage Residents</h2>
  <a href="/admin/dashboard/residents/create" class="add-resident-btn small-blue">+ Add Resident</a>
  <h3>Residents List</h3>
  <table class="resident-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Car Number</th>
        <th>House Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each residents as resident}
        <tr>
          <td>{resident.name}</td>
          <td>{resident.email}</td>
          <td>{resident.phone}</td>
          <td>{resident.carNumber}</td>
          <td>{resident.houseAddress}</td>
          <td>
            <a href={`/admin/dashboard/residents/${resident.id}/edit`} class="edit-btn">Edit</a>
            <form method="POST" style="display:inline" on:submit|preventDefault={() => deleteResident(resident.id)}>
              <button type="submit" class="delete-btn">Delete</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
.admin-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
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
.resident-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}
.resident-table th, .resident-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.resident-table th {
  background: #f7f8fa;
  font-weight: 600;
}
.edit-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  text-decoration: none;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
}
.edit-btn:hover {
  background: #1565c0;
}
.delete-btn {
  background: #e57373;
  color: #fff;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
  margin-left: 0.2rem;
}
.delete-btn:hover {
  background: #c62828;
}
.resident-table td:last-child {
  white-space: nowrap;
  min-width: 120px;
}
  /* Add Resident Button Styles */
  .add-resident-btn {
    display: inline-block;
    margin-bottom: 2rem;
    background: #1976d2;
    color: #fff;
    border: none;
    padding: 0.5rem 1.2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
  }
  .add-resident-btn:hover {
    background: #1565c0;
  }
  .small-blue {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    border-radius: 6px;
  }
</style>
