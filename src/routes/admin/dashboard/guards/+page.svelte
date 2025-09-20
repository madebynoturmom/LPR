<script lang="ts">
  // exported page data
  export let data: any;
  // guards list comes from page data
  let guards: any[] = data?.guards ?? [];

  type Guard = { id?: string; name?: string | null; phone?: string | null; guardId?: string | null; [k: string]: any };
  let selectedGuard: Guard | null = null;
  let error: string | null = null;
  // accordion state: which guard row is expanded
  let expandedId: string | null = null;

  function toggleExpand(id: string | number) {
    const sid = String(id);
    expandedId = expandedId === sid ? null : sid;
  }

  function openEdit(guard: Guard) {
    selectedGuard = { ...guard };
    error = null;
  }

  function cancelEdit(): void {
    selectedGuard = null;
    error = null;
  }

  import { onMount } from 'svelte';

  // toast state for delete success
  let showToast = false;
  let toastProgress = 0; // 0..100

  onMount(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('deleted') === '1') {
        showDeleteToast();
        url.searchParams.delete('deleted');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      }
    } catch (e) {
      // noop
    }
  });

  function showDeleteToast() {
    showToast = true;
    toastProgress = 0;
    const duration = 3000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      toastProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      if (elapsed < duration) requestAnimationFrame(tick);
      else setTimeout(() => (showToast = false), 120);
    };
    requestAnimationFrame(tick);
  }

  async function submitEdit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const id = selectedGuard?.id;
    const res = await fetch(`/admin/dashboard/guards/${id}/edit`, { method: 'POST', body: fd });
    if (!res.ok) {
      error = 'Failed to update guard (server may need an edit endpoint)';
      return;
    }
    // optimistic local update
    const idx = guards.findIndex(g => String(g.id) === String(id));
    if (idx !== -1) {
      const entries = Array.from(fd.entries()).reduce((acc, [k, v]) => {
        // prefer string values for simple form fields
        (acc as any)[String(k)] = typeof v === 'string' ? v : v;
        return acc;
      }, {} as Record<string, any>);
      guards[idx] = { ...guards[idx], ...entries };
    }
    selectedGuard = null;
  }
</script>

 

<div class="subpage-container">
  <div class="subpage-card">
    <div class="subpage-header">
      <div>
        <h2 class="subpage-title">Manage Guards</h2>
      </div>
      <div class="subpage-actions">
        <a href="/admin/dashboard/guards/create" class="add-guard-btn">+ Add Guard</a>
      </div>
    </div>
  <h3>Guards List</h3>
  {#if guards.length > 0}
    <table class="guard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Guard ID</th>
        </tr>
      </thead>
      <tbody>
        {#if selectedGuard}
          <tr class="edit-row"><td colspan="3">
            <div class="edit-card">
              <form class="edit-form subpage-form" on:submit={submitEdit}>
                <input type="hidden" name="id" value={selectedGuard.id} />
                <label>Name<input name="name" value={selectedGuard.name} required /></label>
                <label>Phone<input name="phone" value={selectedGuard.phone} required /></label>
                <label>Guard ID<input name="guardId" value={selectedGuard.guardId} required /></label>
                <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
                  <button type="submit" class="btn btn-update">Update</button>
                  <button type="button" class="btn btn-ghost" on:click={cancelEdit}>Cancel</button>
                </div>
                {#if error}<div class="error">{error}</div>{/if}
              </form>
            </div>
          </td></tr>
        {/if}
        {#each guards as guard}
          <tr class="guard-summary" on:click={() => toggleExpand(guard.id)}>
            <td data-label="Name">{guard.name ?? '-'}</td>
            <td data-label="Phone">{guard.phone ?? '-'}</td>
            <td data-label="Guard ID">{guard.guardId ?? '-'}</td>
          </tr>
          {#if expandedId === String(guard.id)}
            <tr class="guard-details">
              <td colspan="3">
                <div class="resident-details" style="padding:0.75rem 0;">
                  <div class="detail-row"><strong>Name:</strong> {guard.name ?? '—'}</div>
                  <div class="detail-row"><strong>Phone:</strong> {guard.phone ?? '—'}</div>
                  <div class="detail-row"><strong>Guard ID:</strong> {guard.guardId ?? '—'}</div>
                  <div class="detail-actions" style="margin-top:0.5rem;">
                    <button type="button" class="edit-btn" on:click|stopPropagation={() => openEdit(guard)}>Edit</button>
                    <form method="POST" action="?/delete" style="display:inline">
                      <input type="hidden" name="id" value={guard.id} />
                      <button type="submit" class="delete-btn" on:click|stopPropagation>{'Delete'}</button>
                    </form>
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>

  {:else}
    <p>No guards found.</p>
  {/if}
  </div>
</div>

<!-- page-level tweaks (most styles come from subpage.css) -->
<style>
.guard-table { margin-top: 1rem; }
.guard-table th, .guard-table td { padding: 0.9rem 1rem; }

/* Make table responsive: stack rows on small screens */
@media (max-width: 900px) {
  .guard-table thead { display: none; }
  .guard-table, .guard-table tbody, .guard-table tr, .guard-table td { display:block; width:100%; }
  .guard-table tr { margin-bottom: 0.75rem; border:1px solid #eef2ff; border-radius:8px; padding:0.75rem; }
  .guard-table td { padding:0.25rem 0; border:none; }
  .guard-table td::before { content: attr(data-label); display:block; font-weight:600; color:#374151; margin-bottom:0.25rem; }

/* Accordion summary/detail tweaks */
.guard-summary { cursor: pointer; }
.guard-details { background: #fff; border-top: 1px solid #eef2f7; }
}

/* Edit card tweaks */
.edit-card .edit-form label { display:block; margin-bottom:0.75rem; }
.edit-card .edit-form input { width:100%; padding:0.5rem; border-radius:6px; border:1px solid #d1d5db; }
</style>

{#if showToast}
  <div class="toast-wrap" role="status" aria-live="polite">
    <div class="toast">Guard deleted</div>
    <div class="toast-progress"><div class="toast-bar" style="width:{toastProgress}%"></div></div>
  </div>
{/if}
