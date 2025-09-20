<script lang="ts">
  export let data: any;
  let residents: any[] = data?.residents ?? [];
  let error: string | null = null;
  let success: string | null = null;
  async function deleteResident(id: string) {
    if (confirm('Are you sure you want to delete this resident?')) {
      const res = await fetch(`/admin/dashboard/residents/${id}/delete`, { method: 'POST' });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete resident.');
      }
    }
  }

  // single edit card state
  type Resident = {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    carNumber: string | null;
    houseAddress: string | null;
    [key: string]: any;
  };
  let selectedResident: Resident | null = null;

  // accordion state: which resident is expanded
  let expandedId: string | null = null;

  function toggleExpand(id: string) {
    expandedId = expandedId === id ? null : id;
  }

  // search state
  let q = '';
  $: filteredResidents = q
    ? residents.filter(r => {
        const s = (r.name ?? '') + ' ' + (r.email ?? '') + ' ' + (r.carNumber ?? '');
        return s.toLowerCase().includes(q.toLowerCase());
      })
    : residents;

  function clearSearch() {
    q = '';
  }

  function openEdit(resident: Resident) {
    selectedResident = { ...resident };
    error = null;
    success = null;
  }

  function cancelEdit() {
    selectedResident = null;
    error = null;
    success = null;
  }

  async function submitEdit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const id = selectedResident?.id;
    const res = await fetch(`/admin/dashboard/residents/${id}/edit`, { method: 'POST', body: fd });
    if (!res.ok) {
      error = 'Failed to update resident';
      return;
    }
    // update local array
    const idx = residents.findIndex(r => String(r.id) === String(id));
    if (idx !== -1) residents[idx] = { ...residents[idx], ...Object.fromEntries(fd as any) };
    success = 'Resident updated';
    selectedResident = null;
  }

  // toast state for create success
  import { onMount } from 'svelte';
  let showToast = false;
  let toastProgress = 0; // 0..100

  onMount(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('created') === '1') {
        showCreateToast();
        // remove the query param from the URL without reloading
        url.searchParams.delete('created');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      }
    } catch (e) {
      // noop
    }
  });

  function showCreateToast() {
    showToast = true;
    toastProgress = 0;
    const duration = 3000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      toastProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      if (elapsed < duration) requestAnimationFrame(tick);
      else {
        // hide after a short delay to let progress reach 100
        setTimeout(() => (showToast = false), 120);
      }
    };
    requestAnimationFrame(tick);
  }
</script>

 

<div class="subpage-container">
  <div class="subpage-card">
    <div class="subpage-header">
      <div>
        <h2 class="subpage-title">Manage Residents</h2>
      </div>
      <div class="subpage-actions">
        <a href="/admin/dashboard/residents/create" class="add-resident-btn small-blue">+ Add Resident</a>
      </div>
    </div>

    <div class="manage-search">
      <form on:submit|preventDefault>
        <div class="search-row">
          <input type="search" aria-label="Search residents" placeholder="Search by name, email or car" bind:value={q} />
          {#if q}
            <button type="button" class="btn btn-ghost clear-btn" on:click={clearSearch}>Clear</button>
          {/if}
        </div>
      </form>
    </div>

    <h3>Residents List</h3>
    {#if selectedResident}
      <div class="edit-card">
        <form class="edit-form subpage-form" on:submit={submitEdit}>
          <input type="hidden" name="id" value={selectedResident.id} />
          <label>Name<input name="name" value={selectedResident.name} required /></label>
          <label>Email<input name="email" type="email" value={selectedResident.email} required /></label>
          <label>Phone Number<input name="phone" value={selectedResident.phone} required /></label>
          <label>Car Number<input name="carNumber" value={selectedResident.carNumber} required /></label>
          <label>House Address<input name="houseAddress" value={selectedResident.houseAddress} required /></label>
          <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
            <button type="submit" class="btn btn-update">Update</button>
            <button type="button" class="btn btn-ghost" on:click={cancelEdit}>Cancel</button>
          </div>
        </form>
      </div>
    {/if}

    <!-- Compact accordion-style list: show only name + house address, expand to show details -->
    <div class="resident-list">
      {#each filteredResidents as resident (resident.id)}
        <div class="resident-item {expandedId === resident.id ? 'expanded' : ''}">
          <button aria-expanded={expandedId === resident.id} class="resident-summary" on:click={() => toggleExpand(resident.id)}>
            <div class="resident-name">{resident.name}</div>
            <div class="resident-house">{resident.houseAddress}</div>
            <div class="chev">{expandedId === resident.id ? '▾' : '▸'}</div>
          </button>
          {#if expandedId === resident.id}
            <div class="resident-details">
              <div class="detail-row"><strong>Email:</strong> {resident.email ?? '—'}</div>
              <div class="detail-row"><strong>Phone:</strong> {resident.phone ?? '—'}</div>
              <div class="detail-row"><strong>Car:</strong> {resident.carNumber ?? '—'}</div>
              <div class="detail-row"><strong>Address:</strong> {resident.houseAddress ?? '—'}</div>
              <div class="detail-actions">
                <button type="button" class="edit-btn" on:click={() => openEdit(resident)}>Edit</button>
                <form method="POST" style="display:inline" on:submit|preventDefault={() => deleteResident(resident.id)}>
                  <button type="submit" class="delete-btn">Delete</button>
                </form>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

{#if showToast}
  <div class="toast-wrap" role="status" aria-live="polite">
    <div class="toast">Resident created successfully</div>
    <div class="toast-progress"><div class="toast-bar" style="width:{toastProgress}%"></div></div>
  </div>
{/if}

<style>
.search-row { display:flex; gap:0.5rem; align-items:center; }
.search-row input[type="search"] { flex:1; padding:0.75rem 0.9rem; border-radius:10px; border:1px solid #e6eef8; box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); }

.manage-search {
  margin: 0.75rem 0 1rem 0;
}
.clear-btn { padding:0.5rem 0.75rem; border-radius:8px; }

/* Responsive table: stack cells on small screens */

.small-blue { 
  margin-top: 0.5rem; 
  margin-bottom: 2rem; 
  font-size: 1rem; 
  padding: 0.4rem 1rem; 
  border-radius: 6px; 
  font-size: 1rem;
  text-decoration: none;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
}
.edit-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
  margin-left: 0.2rem;
}
.edit-btn:hover {
  background: #1565c0;
}
.delete-btn {
  background: #e57373;
  color: #fff;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
  margin-left: 0.2rem;
}
.delete-btn:hover {
  background: #c62828;
}

/* Accordion styles */
.resident-list { display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem; }
.resident-item { border:1px solid #e6eef8; border-radius:10px; overflow:hidden; }
.resident-summary { display:flex; align-items:center; width:100%; gap:0.75rem; padding:0.75rem 1rem; background:transparent; border:none; text-align:left; cursor:pointer; }
.resident-name { flex:1; font-weight:600; }
.resident-house { color:#6b7280; font-size:0.95rem; }
.chev { color:#9ca3af; margin-left:0.5rem; }
.resident-details { padding:0.75rem 1rem; background:#fff; display:flex; flex-direction:column; gap:0.5rem; }
.detail-row { color:#374151; }
.detail-actions { margin-top:0.5rem; display:flex; gap:0.5rem; align-items:center; }

@media (min-width: 900px) {
  /* On larger screens, show summary as a horizontal row with fixed house column */
  .resident-summary { padding:0.75rem 1rem; }
  .resident-house { min-width:160px; text-align:right; }
}
/* Toast styles (top center) */
.toast-wrap { position: fixed; left: 50%; transform: translateX(-50%); top: 1.25rem; z-index: 9999; width: min(640px, 92vw); pointer-events: none; display:flex; flex-direction:column; gap:0.25rem; align-items:stretch; }
.toast { background: #111827; color: #fff; padding: 0.75rem 1rem; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.12); font-weight:600; pointer-events: auto; }
.toast-progress { height: 4px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow:hidden; }
.toast-bar { height:100%; background: linear-gradient(90deg, #60a5fa, #3b82f6); transition: width 120ms linear; }
  /* Add Resident Button Styles */
  .add-resident-btn {
    display: inline-block;
    margin-bottom: 2rem;
    background: #1976d2;
    color: #fff;
    border: none;
    padding: 0.5rem 1.2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
  }
  .add-resident-btn:hover {
    background: #1565c0;
  }

  .small-blue {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    font-size: 1rem;
    padding: 0.4rem 1rem;
    border-radius: 6px;
  }
</style>
