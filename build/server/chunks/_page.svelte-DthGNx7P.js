import { _ as bind_props } from './index2-yPxTiqcs.js';
import { j as fallback } from './utils2-JZdwKo0Y.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './attributes-BdjbuRwA.js';
import './context-DXUidelg.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let recentActivity = fallback(
      $$props["recentActivity"],
      () => ({
        activeGuestPasses: 0,
        activeFoodDeliveryPasses: 0,
        recentCarAccess: "N/A"
      }),
      true
    );
    $$renderer2.push(`<h1 class="dashboard-title svelte-qewru5">Dashboard Overview</h1> <div class="recent-activity-card svelte-qewru5"><h3 class="svelte-qewru5">Recent Activity</h3> <ul class="svelte-qewru5"><li class="svelte-qewru5"><strong>Active Guest Passes:</strong> ${escape_html(recentActivity.activeGuestPasses)}</li> <li class="svelte-qewru5"><strong>Active Food Delivery Passes:</strong> ${escape_html(recentActivity.activeFoodDeliveryPasses)}</li> <li class="svelte-qewru5"><strong>Recent Car Access:</strong> ${escape_html(recentActivity.recentCarAccess)}</li></ul></div> <div class="dashboard-cards-row svelte-qewru5"><a href="/user/dashboard/vehicles" class="dashboard-card svelte-qewru5"><h2 class="svelte-qewru5">Vehicles</h2> <p>Manage your registered vehicles.</p></a> <a href="/user/dashboard/guests" class="dashboard-card svelte-qewru5"><h2 class="svelte-qewru5">Guest Passes</h2> <p>View and manage your guest passes.</p></a> <a href="/user/dashboard/food-delivery" class="dashboard-card svelte-qewru5"><h2 class="svelte-qewru5">Food Delivery</h2> <p>Grant access for food delivery riders.</p></a></div>`);
    bind_props($$props, { recentActivity });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DthGNx7P.js.map
