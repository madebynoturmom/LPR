<script lang="ts">
  let model = '';
  let makeYear = '';
  let plateNumber = '';
  let error = '';
  let success = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const res = await fetch('', { method: 'POST', body: form });
    const result = await res.json();
    if (result.success) {
      success = true;
      error = '';
      model = makeYear = plateNumber = '';
    } else {
      error = result.error || 'Failed to add vehicle.';
      success = false;
    }
  }
</script>

<h2>Add Vehicle</h2>
<form on:submit|preventDefault={handleSubmit}>
  <label>Model <input name="model" bind:value={model} required /></label>
  <label>Make Year <input name="makeYear" type="number" bind:value={makeYear} required /></label>
  <label>Plate Number <input name="plateNumber" bind:value={plateNumber} required /></label>
  <button type="submit">Add Vehicle</button>
</form>
{#if success}
  <div class="success">Vehicle added!</div>
{/if}
{#if error}
  <div class="error">{error}</div>
{/if}

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}
label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
button {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #1565c0;
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
