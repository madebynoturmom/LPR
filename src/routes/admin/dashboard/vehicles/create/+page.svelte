<script>
  import CustomSelect from '$lib/CustomSelect.svelte';
  export let data;
  let users = data?.users ?? [];
  let error = null;
  let success = null;
  let required = true;
</script>

 

<div class="subpage-container">
  <div class="subpage-card">
    <div class="subpage-header">
      <div>
        <button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard/vehicles'}>&larr; Back</button>
        <h2 class="subpage-title">Add Vehicle</h2>
      </div>
    </div>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if success}
    <div class="success">{success}</div>
  {/if}
  <form method="POST" class="vehicle-form">
    <label>
      Plate Number:
      <input name="plateNumber" required />
    </label>
    <label>
      Owner (Resident):
      <CustomSelect name="ownerId" placeholder="Select owner" {required} options={users.map(u => ({ value: u.id, label: `${u.name} (${u.houseAddress})` }))} />
    </label>
    <label>
      Car Model:
      <input name="model" required />
    </label>
    <label>
      Make Year:
      <input name="makeYear" type="number" min="1900" max="2100" required />
    </label>
    <button type="submit" class="btn btn-update">Add Vehicle</button>
  </form>
  </div>
</div>

<!-- styles moved to subpage.css -->
