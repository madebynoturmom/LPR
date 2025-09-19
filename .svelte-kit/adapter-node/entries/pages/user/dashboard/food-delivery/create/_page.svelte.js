import { a as attr } from "../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let plateNumber = "";
    let durationMinutes = 30;
    $$renderer2.push(`<div class="create-food-delivery-pass svelte-1qwzayq"><a href="/user/dashboard/food-delivery" class="back-btn svelte-1qwzayq">← Back to Food Delivery</a> <h2>Create Food Delivery Pass</h2> <form class="svelte-1qwzayq"><label class="svelte-1qwzayq">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required class="svelte-1qwzayq"/></label> <label class="svelte-1qwzayq">Duration (minutes) <input name="durationMinutes" type="number"${attr("value", durationMinutes)} min="10" max="120" required class="svelte-1qwzayq"/></label> <button type="submit" class="svelte-1qwzayq">Grant Access</button></form> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
