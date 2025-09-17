<script lang="ts">
  let error: string | null = null;
  let success: string | null = null;
</script>

<section class="admin-section">
  <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/guards'}>&larr; Back</button>
  <h2>Add Guard</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if success}
    <div class="success">{success}</div>
  {/if}
  <form method="POST" class="resident-form" enctype="multipart/form-data">
    <label>Guard Name<input name="name" required /></label>
    <label>Phone Number<input name="phone" required /></label>
    <label>Guard ID<input name="guardId" required /></label>
    <label>Profile Picture
      <input type="file" name="profilePic" accept="image/*" />
    </label>
    <button type="submit" class="btn btn-update">Add Guard</button>
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
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.back-btn:hover {
  background: #ddd;
}
.resident-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
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
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
  width: 120px;
  align-self: flex-start;
}
.btn-update:hover {
  background: #1565c0;
}
</style>
