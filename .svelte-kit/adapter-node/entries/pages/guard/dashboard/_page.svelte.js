import { c as ensure_array_like, f as bind_props } from "../../../../chunks/index2.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredVisitors, filteredFood;
    let data = $$props["data"];
    let visitors = data?.activeVisitorPasses ?? [];
    let food = data?.activeFoodDeliveryPasses ?? [];
    let recent = data?.recentCarAccess ?? [];
    let query = "";
    function fmt(dt) {
      try {
        return new Date(dt).toLocaleString();
      } catch (e) {
        return dt;
      }
    }
    filteredVisitors = visitors.filter((p) => {
      return true;
    });
    filteredFood = food.filter((p) => {
      return true;
    });
    $$renderer2.push(`<div class="guard-dashboard svelte-19vu5z5"><header class="gd-header svelte-19vu5z5"><h1>Guard Dashboard</h1> <div class="gd-controls svelte-19vu5z5"><input placeholder="Search plate or name"${attr("value", query)} class="svelte-19vu5z5"/></div></header> <section class="gd-stats svelte-19vu5z5"><div class="stat svelte-19vu5z5">Active Visitors: ${escape_html(visitors.length)}</div> <div class="stat svelte-19vu5z5">Active Deliveries: ${escape_html(food.length)}</div></section> <section class="gd-lists svelte-19vu5z5"><div class="list-card svelte-19vu5z5"><h2>Visitors</h2> `);
    if (filteredVisitors.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="svelte-19vu5z5"><thead><tr><th class="svelte-19vu5z5">Plate</th><th class="svelte-19vu5z5">Name</th><th class="svelte-19vu5z5">Visit</th><th class="svelte-19vu5z5">Duration</th><th class="svelte-19vu5z5">Actions</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(filteredVisitors);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let p = each_array[$$index];
        $$renderer2.push(`<tr><td class="svelte-19vu5z5">${escape_html(p.plateNumber)}</td><td class="svelte-19vu5z5">${escape_html(p.name)}</td><td class="svelte-19vu5z5">${escape_html(fmt(p.visitTime))}</td><td class="svelte-19vu5z5">${escape_html(p.durationMinutes)}m</td><td class="svelte-19vu5z5"><form method="POST" action="?/admit" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn-admit svelte-19vu5z5">Admit</button></form> <form method="POST" action="?/deny" style="display:inline; margin-left:0.5rem;"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn-deny svelte-19vu5z5">Deny</button></form></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No active visitor passes.</p>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="list-card svelte-19vu5z5"><h2>Food Deliveries</h2> `);
    if (filteredFood.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="svelte-19vu5z5"><thead><tr><th class="svelte-19vu5z5">Plate</th><th class="svelte-19vu5z5">Name</th><th class="svelte-19vu5z5">Visit</th><th class="svelte-19vu5z5">Duration</th><th class="svelte-19vu5z5">Actions</th></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(filteredFood);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let p = each_array_1[$$index_1];
        $$renderer2.push(`<tr><td class="svelte-19vu5z5">${escape_html(p.plateNumber)}</td><td class="svelte-19vu5z5">${escape_html(p.name)}</td><td class="svelte-19vu5z5">${escape_html(fmt(p.visitTime))}</td><td class="svelte-19vu5z5">${escape_html(p.durationMinutes)}m</td><td class="svelte-19vu5z5"><form method="POST" action="?/admit" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn-admit svelte-19vu5z5">Admit</button></form> <form method="POST" action="?/deny" style="display:inline; margin-left:0.5rem;"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn-deny svelte-19vu5z5">Deny</button></form></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No active food delivery passes.</p>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="gd-events svelte-19vu5z5"><h2>Recent Events</h2> `);
    if (recent.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul><!--[-->`);
      const each_array_2 = ensure_array_like(recent);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let r = each_array_2[$$index_2];
        $$renderer2.push(`<li>${escape_html(new Date(r.timestamp).toLocaleString())} — ${escape_html(r.details)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No recent events.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
