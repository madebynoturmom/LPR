<script lang="ts">
  export let form;
  let plateNumber = '';
  let name = '';
  let phone = '';
  let visitTime = '';
  let durationMinutes = 60;
</script>

<h2>Create Guest Pass</h2>
<form method="POST" class="guest-form">
  <label>
    Plate Number:
    <input name="plateNumber" bind:value={plateNumber} required />
  </label>
  <label>
    Name:
    <input name="name" bind:value={name} required />
  </label>
  <label>
    Phone:
    <input name="phone" bind:value={phone} required />
  </label>
  <label>
    Visit Time:
    <input name="visitTime" type="datetime-local" bind:value={visitTime} required />
  </label>
  <label>
    Duration (minutes):
    <input name="durationMinutes" type="number" bind:value={durationMinutes} min="10" max="480" required />
  </label>
  <button type="submit" class="btn">Create Guest Pass</button>
</form>

{#if form?.error}
  <div class="error">{form.error}</div>
{/if}

<style>
.guest-form {
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
