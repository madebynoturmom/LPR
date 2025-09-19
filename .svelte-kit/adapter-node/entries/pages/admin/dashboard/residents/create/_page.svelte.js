function _page($$renderer) {
  $$renderer.push(`<section class="admin-section svelte-zsi0l0"><button type="button" class="back-btn svelte-zsi0l0">← Back</button> <h2>Add Resident</h2> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <form method="POST" class="resident-form svelte-zsi0l0"><label class="svelte-zsi0l0">Name<input name="name" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Email<input name="email" type="email" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Phone Number<input name="phone" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Car Number<input name="carNumber" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">House Number<input name="houseNumber" required class="svelte-zsi0l0"/></label> <button type="submit" class="btn btn-update svelte-zsi0l0">Add Resident</button></form></section>`);
}
export {
  _page as default
};
