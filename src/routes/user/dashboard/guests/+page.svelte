<script lang="ts">
  export let data;
  let { guestPasses } = data;
</script>

<div class="guest-page-container">
  <h2>Your Guest Passes</h2>
  <a href="/user/dashboard/guests/create" class="add-btn">+ Create Guest Pass</a>
  {#if guestPasses.length === 0}
    <p>No guest passes found for your account.</p>
  {:else}
    <ul class="guest-pass-list">
      {#each guestPasses as g}
        <li>
          <strong>Plate:</strong> {g.plateNumber}<br />
          <strong>Visit Time:</strong> {new Date(g.visitTime).toLocaleString()}<br />
          <strong>Duration:</strong> {g.durationMinutes} minutes<br />
          <form method="POST" action="?/revoke" style="display:inline">
            <input type="hidden" name="id" value={g.id} />
            <button type="submit" class="revoke-btn">Revoke</button>
          </form>
    <form method="POST" action="?/extend" class="extend-form">
      <input type="hidden" name="id" value={g.id} />
      <input type="number" name="duration" min="1" step="1" value={g.durationMinutes} class="duration-input" required />
      <button type="submit" class="extend-btn">Extend</button>
    </form>
  </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .guest-page-container {
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
  .guest-pass-list {
    list-style: none;
    padding: 0;
    width: 100%;
  }
  .guest-pass-list li {
    background: #f5f5f5;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    position: relative;
  }
  .revoke-btn {
    background: #e57373;
    color: #fff;
    border: none;
    padding: 0.3rem 0.9rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 500;
    margin-top: 0.7rem;
    margin-left: 0;
    transition: background 0.2s;
  }
  .revoke-btn:hover {
    background: #b00;
  }
  .extend-form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .duration-input {
    width: 70px;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #bbb;
    font-size: 1rem;
  }
  .extend-btn {
    background: #1976d2;
    color: #fff;
    border: none;
    padding: 0.3rem 0.9rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
  }
  .extend-btn:hover {
    background: #1565c0;
  }
</style>
