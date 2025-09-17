<script lang="ts">
	export let data;
	let admins = data?.admins ?? [];
	let error: string | null = null;
	let creating = false;
	let username = '';
	let password = '';
</script>

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
.admin-list-card {
	margin-top: 2rem;
}
.admin-table {
	width: 100%;
	border-collapse: collapse;
}
.admin-table th, .admin-table td {
	padding: 0.75rem 1rem;
	border-bottom: 1px solid #eee;
	text-align: left;
}
.admin-table th {
	background: #f7f8fa;
	font-weight: 600;
}
.btn {
	padding: 0.4rem 1rem;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	font-weight: 500;
}
.btn-update {
	background: #eebbc3;
	color: #232946;
	margin-right: 0.5rem;
}
.btn-update:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
.btn-delete {
	background: #232946;
	color: #fff;
}
.btn-create {
	background: #1976d2;
	color: #fff;
}
.error {
	color: #c00;
	margin-bottom: 1rem;
}
</style>
<section class="admin-section">
	<button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
	<h2>Manage Admins</h2>
	{#if error}
		<div class="error">{error}</div>
	{/if}
		<div class="admin-list-card">
			<button class="btn btn-create" style="margin-bottom:1rem" on:click={() => window.location.href = '/admin/dashboard/admins/create'}>+ Add Admin</button>
		<table class="admin-table">
			<thead>
				<tr>
					<th>Username</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each admins as admin}
					<tr>
						<td>
							<form method="POST" on:submit={async (e) => {
								e.preventDefault();
								error = null;
								const form = e.target as HTMLFormElement;
								const formData = new FormData(form);
								const res = await fetch('?/' + 'updateAdmin', { method: 'POST', body: formData });
								if (!res.ok) error = 'Failed to update admin';
								if (res.ok) location.reload();
							}}>
								<input type="hidden" name="id" value={admin.id} />
								<input type="text" name="username" value={admin.username} required />
								<button type="submit" class="btn btn-update">Update</button>
							</form>
						</td>
						<td>
							<form method="POST" action="?/deleteAdmin">
								<input type="hidden" name="id" value={admin.id} />
								<button type="submit" class="btn btn-delete">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
