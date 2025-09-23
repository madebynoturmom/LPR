import { Y as ensure_array_like, $ as bind_props } from "../../../../../chunks/index2.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let events = data?.events ?? [];
    const displayedEvents = events && events.length > 0 ? events : [];
    $$renderer2.push(`<div class="subpage-container"><div class="subpage-card"><div class="subpage-header"><div><button type="button" class="back-btn">← Back</button> <h2 class="subpage-title">Event Logs</h2></div></div> `);
    if (displayedEvents.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<table class="event-table"><thead><tr><th>Type</th><th>User</th><th>Details</th><th>Timestamp</th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(displayedEvents);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        $$renderer2.push(`<tr><td>${escape_html(event.type)}</td><td>${escape_html(event.userName)}</td><td>${escape_html(event.details)}</td><td>${escape_html(event.time)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p>No event logs found.</p>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
