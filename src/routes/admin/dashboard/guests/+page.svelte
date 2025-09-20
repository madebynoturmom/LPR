
<script>
	export let data;
	let passes = data?.passes ?? [];
</script>

<section class="admin-section">
		<button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
	<h2>Manage Guest Passes</h2>
	<form method="POST" action="?/create" class="guest-form">
		<label>
			Plate Number:
			<input name="plateNumber" required />
		</label>
		<label>
			Name:
			<input name="name" required />
		</label>
		<label>
			Phone:
			<input name="phone" required />
		</label>
		<label>
			Visit Time:
			<input name="visitTime" type="datetime-local" required />
		</label>
		<label>
			Duration (minutes):
			<input name="durationMinutes" type="number" min="1" required />
		</label>
		<button type="submit" class="btn btn-update">Create Pass</button>
	</form>
	<h3>Active Guest Passes</h3>
	{#if passes.length > 0}
		<table class="guest-table">
			<thead>
				<tr>
					<th>Plate Number</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Visit Time</th>
					<th>Duration (min)</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each passes as pass}
					<tr>
						<td>{pass.plateNumber}</td>
						<td>{pass.name}</td>
						<td>{pass.phone}</td>
						<td>{new Date(pass.visitTime).toLocaleString()}</td>
						<td>{pass.durationMinutes}</td>
						<td>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={pass.id} />
								<button type="submit" class="btn btn-delete">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No guest passes found.</p>
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
	background: #eee;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	cursor: pointer;
}
.back-btn:hover {
	background: #ddd;
}
.guest-form {
	display: flex;
	gap: 2rem;
	margin-bottom: 2rem;
}
.guest-form label {
	display: flex;
	flex-direction: column;
	font-weight: 500;
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
.btn-delete {
	background: #232946;
	color: #fff;
}
.guest-table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 2rem;
}
.guest-table th, .guest-table td {
	padding: 0.75rem 1rem;
	border-bottom: 1px solid #eee;
	text-align: left;
}
.guest-table th {
		background: #f7f8fa;
		font-weight: 600;
	}
	</style>