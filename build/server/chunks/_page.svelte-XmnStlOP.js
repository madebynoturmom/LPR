function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn svelte-zsi0l0">← Back</button> <h2 class="subpage-title">Add Resident</h2></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="resident-form svelte-zsi0l0"><label class="svelte-zsi0l0">Name<input name="name" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Email<input name="email" type="email" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Phone Number<input name="phone" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">Car Number<input name="carNumber" required class="svelte-zsi0l0"/></label> <label class="svelte-zsi0l0">House Address<input name="houseAddress" required class="svelte-zsi0l0"/></label> <button type="submit" class="btn btn-update svelte-zsi0l0">Add Resident</button></form></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-XmnStlOP.js.map
