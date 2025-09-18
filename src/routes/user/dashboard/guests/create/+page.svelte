<script lang="ts">
  let plateNumber = '';
  let durationMinutes = 60;
  let success = false;
  let error = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const res = await fetch('', { method: 'POST', body: form });
    const result = await res.json();
    if (result.success) {
      success = true;
      error = '';
      plateNumber = '';
      durationMinutes = 60;
    } else {
      error = result.error || 'Failed to create guest pass.';
      success = false;
    }
  }
</script>

<h2>Create Guest Pass</h2>
<form on:submit|preventDefault={handleSubmit}>
  <label>Plate Number <input name="plateNumber" bind:value={plateNumber} required /></label>
  <label>Duration (minutes) <input name="durationMinutes" type="number" bind:value={durationMinutes} min="10" max="1440" required /></label>
  <button type="submit">Create Pass</button>
</form>
{#if success}
  <div class="success">Guest pass created!</div>
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
