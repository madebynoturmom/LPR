import { c as ensure_array_like } from './index2-CW9yIE9Z.js';
import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer) {
  const items = [
    { title: "Residents", href: "/user/dashboard/residents" },
    { title: "Guards", href: "/user/dashboard/guards" },
    { title: "Vehicles", href: "/user/dashboard/vehicles" },
    { title: "Admins", href: "/admin/dashboard" },
    { title: "Guests", href: "/user/dashboard/guests" },
    { title: "Events", href: "/user/dashboard/events" },
    {
      title: "System Overview",
      href: "/user/dashboard/manage/system-overview"
    }
  ];
  $$renderer.push(`<div class="manage-card svelte-e6q1y1"><h1 class="svelte-e6q1y1">Manage</h1> <p class="manage-desc svelte-e6q1y1">Manage Residents, Guards, Vehicles, Admins, and Guests from one page.</p> <div class="manage-list svelte-e6q1y1"><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<a class="manage-item svelte-e6q1y1"${attr("href", item.href)}><span>${escape_html(item.title)}</span> <span class="arrow svelte-e6q1y1">→</span></a>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dg2AFQ2K.js.map
