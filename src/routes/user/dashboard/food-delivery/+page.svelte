<script lang="ts">
  export let data;
  let { foodDeliveryPasses } = data;
</script>

<div class="food-delivery-page-container">
  <a href="/user/dashboard" class="back-btn">&larr; Back to Dashboard</a>
  <h2>Your Food Delivery Passes</h2>
  <a href="/user/dashboard/food-delivery/create" class="add-btn">+ Create Food Delivery Pass</a>
  {#if foodDeliveryPasses.length === 0}
    <p>No food delivery passes found for your account.</p>
  {:else}
    <ul class="food-delivery-pass-list">
      {#each foodDeliveryPasses as f}
        <li>
          <strong>Plate:</strong> {f.plateNumber}<br />
          <strong>Visit Time:</strong> {new Date(f.visitTime).toLocaleString()}<br />
          <strong>Duration:</strong> {f.durationMinutes} minutes<br />
          <form method="POST" action="?/revoke" style="display:inline">
            <input type="hidden" name="id" value={f.id} />
            <button type="submit" class="revoke-btn">Revoke</button>
          </form>
          <form method="POST" action="?/extend" class="extend-form">
            <input type="hidden" name="id" value={f.id} />
            <label for="extend-{f.id}" class="extend-label">Add minutes:</label>
            <input id="extend-{f.id}" type="number" name="duration" min="1" step="1" placeholder="30" class="duration-input" required />
            <button type="submit" class="extend-btn">Extend</button>
          </form>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .food-delivery-page-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 600px;
    margin-left: 1rem;
    margin-right: auto;
    margin-top: 3rem;
    box-sizing: border-box;
  }
  .food-delivery-pass-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .food-delivery-pass-list li {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  .revoke-btn, .extend-btn {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .revoke-btn:hover, .extend-btn:hover {
    background-color: #0056b3;
  }
  .back-btn {
    display: inline-block;
    margin-bottom: 1.5rem;
    background: #e0e0e0;
    color: #000;
    padding: 0.4rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  }
  .back-btn:hover {
    background: #d6d6d6;
  }
  .add-btn {
    display: inline-block;
    margin-top: 0.5rem;
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
</style>
