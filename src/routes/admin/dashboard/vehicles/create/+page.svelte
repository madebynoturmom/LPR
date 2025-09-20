<script>
  export let data;
  let users = data?.users ?? [];
  let error = null;
  let success = null;
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/vehicles'}>&larr; Back</button>
  <h2>Add Vehicle</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if success}
    <div class="success">{success}</div>
  {/if}
  <form method="POST" class="vehicle-form">
    <label>
      Plate Number:
      <input name="plateNumber" required />
    </label>
    <label>
      Owner (Resident):
      <select name="ownerId" required>
        <option value="">Select owner</option>
        {#each users as user}
          <option value={user.id}>{user.name} ({user.houseAddress})</option>
        {/each}
      </select>
    </label>
    <label>
      Car Model:
      <input name="model" required />
    </label>
    <label>
      Make Year:
      <input name="makeYear" type="number" min="1900" max="2100" required />
    </label>
    <button type="submit" class="btn btn-update">Add Vehicle</button>
  </form>
</section>

<style>
.admin-section {
  max-width: 500px;
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
.vehicle-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.vehicle-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
.btn {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.btn-update {
  background: #1976d2;
  color: #fff;
  margin-right: 0.5rem;
}
.error {
  color: #b00;
  margin-bottom: 1rem;
}
.success {
  color: #080;
  margin-bottom: 1rem;
}
</style>
