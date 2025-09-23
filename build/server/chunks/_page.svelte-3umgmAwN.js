import { Y as ensure_array_like, W as attr_class, _ as stringify, $ as bind_props } from './index2-Dybjf8Ej.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import './utils2-JZdwKo0Y.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let admins = data?.admins ?? [];
    let expandedId = null;
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><h2 class="subpage-title">Manage Admins</h2></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="subpage-actions"><a class="btn btn-create" href="/admin/dashboard/admins/create">+ Add Admin</a></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="admin-list-card">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="resident-list"><!--[-->`);
    const each_array = ensure_array_like(admins);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let admin = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`resident-item ${stringify(expandedId === admin.id ? "expanded" : "")}`)}><button class="resident-summary"><div class="resident-name">${escape_html(admin.username)}</div> <div class="chev">${escape_html(expandedId === admin.id ? "▾" : "▸")}</div></button> `);
      if (expandedId === admin.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="resident-details"><div class="detail-row"><strong>Username:</strong> ${escape_html(admin.username)}</div> <div class="detail-actions"><button type="button" class="edit-btn">Edit</button> <form method="POST" action="?/deleteAdmin" style="display:inline"><input type="hidden" name="id"${attr("value", admin.id)}/> <button type="submit" class="delete-btn">Delete</button></form></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-3umgmAwN.js.map
