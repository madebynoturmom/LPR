<script lang="ts">
  let plateNumber = '';
  let durationMinutes = 30;
  let success = false;
  let error = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const res = await fetch('/api/food-delivery/create', { method: 'POST', body: form });
    const result = await res.json();
    if (result.success) {
      success = true;
      error = '';
      plateNumber = '';
      durationMinutes = 30;
    } else {
      error = result.error || 'Failed to issue pass.';
      success = false;
    }
  }
</script>

<div class="create-food-delivery-pass">
  <a href="/user/dashboard/food-delivery" class="back-btn">&larr; Back to Food Delivery</a>
  <h2>Create Food Delivery Pass</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label>Plate Number <input name="plateNumber" bind:value={plateNumber} required /></label>
    <label>Duration (minutes) <input name="durationMinutes" type="number" bind:value={durationMinutes} min="10" max="120" required /></label>
    <button type="submit">Grant Access</button>
  </form>
  {#if success}
    <div class="success">Access granted for food delivery!</div>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}
</div>

<style>
  .back-btn {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    color: #212529;
    border: 1px solid #ced4da;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1rem;
    cursor: pointer;
  }
  .back-btn:hover {
    background-color: #e2e6ea;
  }
  .create-food-delivery-pass {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 400px;
    margin-left: 1rem;
    margin-right: auto;
    margin-top: 3rem;
    box-sizing: border-box;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  label {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    width: 100%;
  }
  input {
    width: 90%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .success {
    color: green;
    margin-top: 1rem;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
</style>