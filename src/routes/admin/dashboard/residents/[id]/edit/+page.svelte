<script lang="ts">
  export let data;
  let resident = data.resident;
  let error = null;
  let success = null;
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/residents'}>&larr; Back</button>
  <h2>Edit Resident</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if success}
    <div class="success">{success}</div>
  {/if}
  {#if resident}
    <form method="POST" class="resident-form">
      <label>Name<input name="name" value={resident.name} required /></label>
      <label>Email<input name="email" type="email" value={resident.email} required /></label>
      <label>Phone Number<input name="phone" value={resident.phone} required /></label>
      <label>Car Number<input name="carNumber" value={resident.carNumber} required /></label>
      <label>House Number<input name="houseNumber" value={resident.houseNumber} required /></label>
      <button type="submit" class="btn btn-update">Update Resident</button>
    </form>
  {:else}
    <div class="error">Resident not found.</div>
  {/if}
</section>

<style>
.admin-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.back-btn {
  margin-bottom: 1rem;
}
.resident-form label {
  display: block;
  margin-bottom: 1rem;
}
.resident-form input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
}
.btn-update {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
