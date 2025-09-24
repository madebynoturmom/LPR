import { f as bind_props } from "../../../../../../../chunks/index2.js";
import { a as attr } from "../../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let resident = data.resident;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Edit Resident</h2></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (resident) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" class="resident-form"><label>Name<input name="name"${attr("value", resident.name)} required/></label> <label>Email<input name="email" type="email"${attr("value", resident.email)} required/></label> <label>Phone Number<input name="phone"${attr("value", resident.phone)} required/></label> <label>Car Number<input name="carNumber"${attr("value", resident.carNumber)} required/></label> <label>House Address<input name="houseAddress"${attr("value", resident.houseAddress)} required/></label> <button type="submit" class="btn btn-update">Update Resident</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error">Resident not found.</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
