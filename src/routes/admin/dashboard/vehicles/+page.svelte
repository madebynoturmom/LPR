<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let vehicles: any[] = data?.vehicles ?? [];
	let expandedId: string | null = null;
	function toggle(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	let showToast = false;
	let toastProgress = 0;
</script>

<svelte:head>
	<link rel="stylesheet" href="/admin/dashboard/subpage.css" />
</svelte:head>

<div class="subpage-container">
	<div class="subpage-card">
	<div class="subpage-header">
		<div>
			<h2 class="subpage-title">Vehicles</h2>
		</div>
		<div class="subpage-actions">
			<a class="add-vehicle-btn" href="/admin/dashboard/vehicles/create">+ Add Vehicle</a>
		</div>
	</div>

	{#if vehicles.length === 0}
		<p style="margin-top:1rem;color:#6b7280">No vehicles yet</p>
	{:else}
		<div class="resident-list">
			{#each vehicles as vehicle (vehicle.id)}
				<div class="resident-item {expandedId === vehicle.id ? 'expanded' : ''}">
					<button class="resident-summary" on:click={() => toggle(vehicle.id)} aria-expanded={expandedId === vehicle.id}>
						<div class="resident-name">{vehicle.plateNumber}</div>
						<div class="resident-house">{vehicle.ownerName}</div>
						<div class="chev">{expandedId === vehicle.id ? '▾' : '▸'}</div>
					</button>

					{#if expandedId === vehicle.id}
						<div class="resident-details">
							<div class="detail-row"><strong>Plate:</strong> {vehicle.plateNumber}</div>
							<div class="detail-row"><strong>Owner:</strong> {vehicle.ownerName}</div>
							<div class="detail-row"><strong>Model:</strong> {vehicle.model ?? '—'}</div>
							<div class="detail-actions">
								<a class="edit-btn" href={`/admin/dashboard/vehicles/${vehicle.id}/edit`}>Edit</a>
								<form method="POST" action="?/delete" style="display:inline">
									<input type="hidden" name="id" value={vehicle.id} />
									<button type="submit" class="delete-btn">Delete</button>
								</form>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
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
</style>
</div>

{#if showToast}
	<div class="toast-wrap" role="status" aria-live="polite">
		<div class="toast">Vehicle deleted</div>
	</div>
{/if}