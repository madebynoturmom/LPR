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
  /* responsive container width */
  width: clamp(320px, 92vw, 900px);
  margin: 2rem auto;
  padding: clamp(1rem, 4vw, 2rem);
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
  gap: 1rem;
  margin-bottom: 1.25rem;
  max-width: 100%;
}
.resident-form label {
  display: block;
}
.resident-form input[type="file"],
.resident-form input:not([type]) {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.35rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
}
.resident-form input[type="file"] {
  padding: 0.35rem 0.35rem;
}
.btn-update {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 0.5rem;
  width: 100%;
  align-self: stretch;
}
.btn-update:hover {
  background: #1565c0;
}

/* On larger screens, keep the button compact and left-aligned */
@media (min-width: 720px) {
  .resident-form { gap: 1.2rem; }
  .btn-update { width: 160px; align-self: flex-start; }
}
</style>
