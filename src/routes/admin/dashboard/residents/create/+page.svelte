<script lang="ts">
  let error: string | null = null;
  let success: string | null = null;
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/residents'}>&larr; Back</button>
  <h2>Add Resident</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if success}
    <div class="success">{success}</div>
  {/if}
  <form method="POST" class="resident-form">
    <label>Name<input name="name" required /></label>
    <label>Email<input name="email" type="email" required /></label>
    <label>Phone Number<input name="phone" required /></label>
    <label>Car Number<input name="carNumber" required /></label>
    <label>House Address<input name="houseAddress" required /></label>
    <button type="submit" class="btn btn-update">Add Resident</button>
  </form>
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
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-update:hover {
  background: #1565c0;
}
</style>
