
<script>
	export let data;
	let vehicles = data?.vehicles ?? [];
	let users = data?.users ?? [];
</script>

<section class="admin-section">
	<button type="button" class="back-btn" on:click={() => window.location.href = '/admin/dashboard'}>&larr; Back</button>
	<h2>Manage Vehicles</h2>
	<a href="/admin/dashboard/vehicles/create" class="add-vehicle-btn">+ Add Vehicle</a>
	<h3>Vehicles List</h3>
	<table class="vehicle-table">
		<thead>
			<tr>
				<th>Plate Number</th>
				<th>Owner</th>
				<th>Car Model</th>
				<th>Make Year</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each vehicles as vehicle}
				<tr>
					<td>{vehicle.plateNumber}</td>
					<td>{vehicle.ownerName ?? '-'}</td>
					<td>{vehicle.model}</td>
					<td>{vehicle.makeYear}</td>
					<td>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value={vehicle.id} />
							<button type="submit" class="btn btn-delete">Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
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

.btn {
	padding: 0.4rem 1rem;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	font-weight: 500;
}
.add-vehicle-btn {
	display: inline-block;
	margin-bottom: 2rem;
	background: #1976d2;
	color: #fff;
	border: none;
	padding: 0.4rem 1.2rem;
	border-radius: 6px;
	font-size: 1.1rem;
	text-decoration: none;
	cursor: pointer;
	transition: background 0.2s;
	box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
	text-align: center;
}
.add-vehicle-btn:hover {
	background: #1565c0;
}

.btn-delete {
	background: #232946;
	color: #fff;
}
.vehicle-table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 2rem;
}
.vehicle-table th, .vehicle-table td {
	padding: 0.75rem 1rem;
	border-bottom: 1px solid #eee;
	text-align: left;
}
</style>