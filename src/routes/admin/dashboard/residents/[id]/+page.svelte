<script lang="ts">
  import { page } from '$app/stores';
  export let data;
  let resident = data.resident;
</script>

<section class="resident-detail-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/residents'}>&larr; Back</button>
  <h2>Resident Details</h2>
  {#if resident}
    <ul class="resident-detail-list">
      <li><strong>Name:</strong> {resident.name}</li>
      <li><strong>Email:</strong> {resident.email}</li>
      <li><strong>Phone:</strong> {resident.phone}</li>
      <li><strong>Car Number:</strong> {resident.carNumber}</li>
      <li><strong>House Number:</strong> {resident.houseNumber}</li>
    </ul>
  {:else}
    <div class="error">Resident not found.</div>
  {/if}
</section>

<style>
.resident-detail-section {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.back-btn {
  margin-bottom: 1rem;
}
.resident-detail-list {
  list-style: none;
  padding: 0;
}
.resident-detail-list li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
</style>
