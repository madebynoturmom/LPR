function _page($$renderer) {
  $$renderer.push(`<section class="admin-section"><button type="button" class="back-btn">← Back</button> <h2>Add Guard</h2> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <form method="POST" class="resident-form" enctype="multipart/form-data"><label>Guard Name<input name="name" required/></label> <label>Phone Number<input name="phone" required/></label> <label>Guard ID<input name="guardId" required/></label> <label>Profile Picture <input type="file" name="profilePic" accept="image/*"/></label> <button type="submit" class="btn btn-update">Add Guard</button></form></section>`);
}
export {
  _page as default
};
