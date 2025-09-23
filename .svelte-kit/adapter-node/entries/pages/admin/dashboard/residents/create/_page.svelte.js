function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Add Resident</h2></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="resident-form"><label>Name<input name="name" required/></label> <label>Email<input name="email" type="email" required/></label> <label>Phone Number<input name="phone" required/></label> <label>Car Number<input name="carNumber" required/></label> <label>House Address<input name="houseAddress" required/></label> <button type="submit" class="btn btn-update">Add Resident</button></form></div></div>`);
  });
}
export {
  _page as default
};
