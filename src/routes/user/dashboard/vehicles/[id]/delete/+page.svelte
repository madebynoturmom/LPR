<script lang="ts">
  export let data;
  let { vehicle } = data;
  let error = '';
  let success = false;

  async function handleDelete() {
    const res = await fetch('', { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      success = true;
      error = '';
    } else {
      error = result.error || 'Failed to delete vehicle.';
      success = false;
    }
  }
</script>

<h2>Delete Vehicle</h2>
<p>Are you sure you want to delete this vehicle?</p>
<ul>
  <li><strong>{vehicle.model}</strong> ({vehicle.makeYear})</li>
  <li>Plate: {vehicle.plateNumber}</li>
</ul>
<button on:click={handleDelete} class="delete-btn">Delete</button>
{#if success}
  <div class="success">Vehicle deleted!</div>
{/if}
{#if error}
  <div class="error">{error}</div>
{/if}

<style>
.delete-btn {
  background: #b00;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.delete-btn:hover {
  background: #900;
}
.success {
  color: #1976d2;
  margin-top: 1rem;
}
.error {
  color: #b00;
  margin-top: 1rem;
}
</style>
