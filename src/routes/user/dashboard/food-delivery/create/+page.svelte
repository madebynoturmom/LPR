<script lang="ts">
  export let form;
  let plateNumber = '';
  let name = '';
  let phone = '';
  let durationMinutes = 30;
</script>

<div class="create-food-delivery-pass">
  <a href="/user/dashboard/food-delivery" class="back-btn">&larr; Back to Food Delivery</a>
  <h2>Create Food Delivery Pass</h2>
  <form method="POST">
    <label>Plate Number <input name="plateNumber" bind:value={plateNumber} required /></label>
    <label>Name <input name="name" bind:value={name} required /></label>
    <label>Phone <input name="phone" bind:value={phone} required /></label>
    <label>Duration (minutes) <input name="durationMinutes" type="number" bind:value={durationMinutes} min="10" max="120" required /></label>
    <button type="submit" class="btn">Grant Access</button>
  </form>
  {#if form?.error}
    <div class="error">{form.error}</div>
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
    width: 110%;
    max-width: 350px;
    margin-left: 1rem;
    margin-right: auto;
    margin-top: 3rem;
    box-sizing: border-box;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 115%;
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
    color: red;
    margin-top: 1rem;
  }
</style>