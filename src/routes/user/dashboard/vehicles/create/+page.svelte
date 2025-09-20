<script lang="ts">
  export let form;
  let model = '';
  let makeYear = '';
  let plateNumber = '';
</script>

<h2>Add Vehicle</h2>
<form method="POST">
  <label>Model <input name="model" bind:value={model} required /></label>
  <label>Make Year <input name="makeYear" type="number" bind:value={makeYear} required /></label>
  <label>Plate Number <input name="plateNumber" bind:value={plateNumber} required /></label>
  <button type="submit" class="btn">Add Vehicle</button>
</form>
{#if form?.error}
  <div class="error">{form.error}</div>
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
.btn {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:hover {
  background: #1565c0;
}
.error {
  color: #b00;
  margin-top: 1rem;
}
</style>
