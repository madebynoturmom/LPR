import { f as bind_props } from './index2-CW9yIE9Z.js';
import { j as fallback } from './utils2-JZdwKo0Y.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-BatlNbRu.js';

function CustomSelect($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = fallback($$props["name"], "custom-select");
    let options = fallback($$props["options"], () => [], true);
    let placeholder = fallback($$props["placeholder"], "Select...");
    let required = fallback($$props["required"], false);
    let value = fallback($$props["value"], "");
    let open = false;
    let listId = `cs-${Math.random().toString(36).slice(2, 9)}`;
    $$renderer2.push(`<div class="cs-wrapper svelte-qg1zp4"><input type="hidden"${attr("name", name)}${attr("value", value)}${attr("required", required, true)}/> <button type="button" class="cs-control svelte-qg1zp4" role="combobox"${attr("aria-expanded", open)} aria-haspopup="listbox"${attr("aria-controls", listId)}${attr("aria-activedescendant", void 0)} tabindex="0"><div class="cs-value svelte-qg1zp4">${escape_html(placeholder)}</div> <div class="cs-caret svelte-qg1zp4" aria-hidden="true">▾</div></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { name, options, placeholder, required, value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let users = data?.users ?? [];
    let required = true;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Add Vehicle</h2></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="vehicle-form"><label>Plate Number: <input name="plateNumber" required/></label> <label>Owner (Resident): `);
    CustomSelect($$renderer2, {
      name: "ownerId",
      placeholder: "Select owner",
      required,
      options: users.map((u) => ({ value: u.id, label: `${u.name} (${u.houseAddress})` }))
    });
    $$renderer2.push(`<!----></label> <label>Car Model: <input name="model" required/></label> <label>Make Year: <input name="makeYear" type="number" min="1900" max="2100" required/></label> <button type="submit" class="btn btn-update">Add Vehicle</button></form></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cs6vKDyu.js.map
