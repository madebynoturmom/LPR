<script lang="ts">
  export let data;
  let { vehicles } = data;
</script>

<div class="vehicle-page-container">
  <h2>Your Vehicles</h2>
  <a href="/user/dashboard/vehicles/create" class="add-btn">+ Add Vehicle</a>
  {#if vehicles.length === 0}
    <p>No vehicles found for your account.</p>
  {:else}
    <ul class="vehicle-list">
      {#each vehicles as v}
        <li>
          <strong>{v.model}</strong> ({v.makeYear})<br />
          Plate: {v.plateNumber}<br />
          <a href={`/user/dashboard/vehicles/${v.id}/edit`} class="edit-link">Edit</a>
          <a href={`/user/dashboard/vehicles/${v.id}/delete`} class="delete-link">Delete</a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
.vehicle-list {
  list-style: none;
  padding: 0;
}
.vehicle-list li {
  background: #f5f5f5;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}
.add-btn {
  display: inline-block;
  margin-bottom: 1.5rem;
  background: #1976d2;
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
}
.add-btn:hover {
  background: #1565c0;
}
.edit-link, .delete-link {
  margin-right: 1rem;
  color: #1976d2;
  text-decoration: underline;
  cursor: pointer;
}
.delete-link {
  color: #b00;
}
  .vehicle-page-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 600px;
    margin-left: 0;
    margin-right: auto;
    margin-top: 3rem;
    margin-left: 1rem;
    box-sizing: border-box;
  }
</style>
