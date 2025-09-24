import { c as ensure_array_like } from "../../../../../chunks/index2.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer) {
  const items = [
    {
      title: "System Overview",
      href: "/admin/dashboard/manage/system-overview"
    },
    { title: "Residents", href: "/admin/dashboard/residents" },
    { title: "Guards", href: "/admin/dashboard/guards" },
    { title: "Vehicles", href: "/admin/dashboard/vehicles" },
    { title: "Admins", href: "/admin/dashboard/admins" },
    { title: "Guests", href: "/admin/dashboard/guests" },
    { title: "Events", href: "/admin/dashboard/events" }
  ];
  $$renderer.push(`<div class="manage-container svelte-7mi1df"><div class="manage-card svelte-7mi1df"><h1 class="svelte-7mi1df">Manage</h1> <p class="manage-desc svelte-7mi1df">Manage Residents, Guards, Vehicles, Admins, and Guests from one page.</p> <div class="manage-list svelte-7mi1df"><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<a class="manage-item svelte-7mi1df"${attr("href", item.href)}><span>${escape_html(item.title)}</span> <span class="arrow svelte-7mi1df">→</span></a>`);
  }
  $$renderer.push(`<!--]--></div></div></div>`);
}
export {
  _page as default
};
