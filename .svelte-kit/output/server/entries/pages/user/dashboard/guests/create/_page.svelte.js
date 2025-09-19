import { a as attr } from "../../../../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let plateNumber = "";
    let durationMinutes = 60;
    $$renderer2.push(`<h2>Create Guest Pass</h2> <form class="svelte-1cvmrf2"><label class="svelte-1cvmrf2">Plate Number <input name="plateNumber"${attr("value", plateNumber)} required/></label> <label class="svelte-1cvmrf2">Duration (minutes) <input name="durationMinutes" type="number"${attr("value", durationMinutes)} min="10" max="1440" required/></label> <button type="submit" class="svelte-1cvmrf2">Create Pass</button></form> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
