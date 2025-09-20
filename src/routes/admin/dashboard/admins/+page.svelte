<script lang="ts">
	export let data;
	let admins = data?.admins ?? [];
	let error: string | null = null;
	let creating = false;
	let username = '';
	let password = '';

	// Mobile-friendly single edit card
	let selectedAdmin: { id?: string | number; username?: string } | null = null;

	function openEdit(admin: { id?: string | number; username?: string }) {
		selectedAdmin = { ...admin };
		error = null;
	}

	function cancelEdit() {
		selectedAdmin = null;
		error = null;
	}

	import { onMount } from 'svelte';
	let expandedId: string | number | null = null;
	let showToast = false;
	let toastProgress = 0;

	function toggleExpand(id: string | number) { expandedId = expandedId === id ? null : id; }

	onMount(() => {
		try {
			const url = new URL(window.location.href);
			if (url.searchParams.get('deleted') === '1') {
				showDeleteToast();
				url.searchParams.delete('deleted');
				window.history.replaceState({}, '', url.pathname + url.search + url.hash);
			}
		} catch (e) {}
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
		error = null;
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const res = await fetch('?/' + 'updateAdmin', { method: 'POST', body: formData });
		if (!res.ok) {
			error = 'Failed to update admin';
			return;
		}
		// update local list for immediacy
		const id = formData.get('id') as string;
		const newUsername = formData.get('username') as string;
		const idx = admins.findIndex(a => String(a.id) === String(id));
		if (idx !== -1) admins[idx] = { ...admins[idx], username: newUsername };
		selectedAdmin = null;
	}
</script>

<style>
/* Simplified styles for Manage Admins (accordion-based) */
.subpage-header { align-items: center; gap: 1rem; }
.subpage-actions { display:flex; align-items:center; margin-bottom:0.75rem; }
.subpage-actions .btn-create { padding: 0.75rem 1.25rem; border-radius: 10px; font-weight:700; box-shadow: 0 6px 18px rgba(25,118,210,0.08); }

.admin-list-card { margin-top: 1.25rem; }
.edit-card { background: #fff; border: 1px solid #eef2f7; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(16,24,40,0.04); margin-bottom: 1rem; }
.edit-form .btn-update { background: #eebbc3; color: #232946; }

/* Accordion items reuse resident-list styles from other pages; add small helpers */
.resident-list { display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem; }
.resident-item { border:1px solid #e6eef8; border-radius:10px; overflow:hidden; }
.resident-summary { display:flex; align-items:center; width:100%; gap:0.75rem; padding:0.75rem 1rem; background:transparent; border:none; text-align:left; cursor:pointer; }
.resident-name { flex:1; font-weight:600; }
.chev { color:#9ca3af; margin-left:0.5rem; }
.resident-details { padding:0.75rem 1rem; background:#fff; display:flex; flex-direction:column; gap:0.5rem; }
.detail-row { color:#374151; }
.detail-actions { margin-top:0.5rem; display:flex; gap:0.5rem; align-items:center; }

.btn { padding: 0.5rem 0.9rem; border-radius: 8px; border: none; cursor: pointer; font-weight:600; }
.btn-update { background: #f4c6cc; color:#232946; }
.btn-create { background: linear-gradient(90deg,#1976d2,#1565c0); color:#fff; }
.error { color: #c00; margin-bottom: 1rem; }

@media (max-width: 900px) {
	.subpage-actions .btn-create { width: 100%; display:block; }
}
</style>
 

<div class="subpage-container">
	<div class="subpage-card">
		<div class="subpage-header">
			<div>
				<h2 class="subpage-title">Manage Admins</h2>
			</div>

	{#if showToast}
	  <div class="toast-wrap" role="status" aria-live="polite">
	    <div class="toast">Admin deleted</div>
	    <div class="toast-progress"><div class="toast-bar" style="width:{toastProgress}%"></div></div>
	  </div>
	{/if}
			<div class="subpage-actions">
					<a class="btn btn-create" href="/admin/dashboard/admins/create">+ Add Admin</a>
				</div>
		</div>
	{#if error}
		<div class="error">{error}</div>
	{/if}
		
		<div class="admin-list-card">
			{#if selectedAdmin}
				<div class="edit-card">
					<form class="edit-form subpage-form" on:submit={submitEdit}>
						<input type="hidden" name="id" value={selectedAdmin.id} />
						<label for="username">Username</label>
						<input id="username" name="username" type="text" bind:value={selectedAdmin.username} required />
						<div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
							<button type="submit" class="btn btn-update">Update</button>
							<button type="button" class="btn btn-ghost" on:click={cancelEdit}>Cancel</button>
						</div>
					</form>
				</div>
			{/if}
			<div class="resident-list">
				{#each admins as admin}
					<div class="resident-item {expandedId === admin.id ? 'expanded' : ''}">
						<button class="resident-summary" on:click={() => toggleExpand(admin.id)}>
							<div class="resident-name">{admin.username}</div>
							<div class="chev">{expandedId === admin.id ? '▾' : '▸'}</div>
						</button>
						{#if expandedId === admin.id}
							<div class="resident-details">
								<div class="detail-row"><strong>Username:</strong> {admin.username}</div>
								<div class="detail-actions">
									<button type="button" class="edit-btn" on:click={() => openEdit(admin)}>Edit</button>
									<form method="POST" action="?/deleteAdmin" style="display:inline">
										<input type="hidden" name="id" value={admin.id} />
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
	</div>
