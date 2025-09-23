import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { W as attr_class, a1 as attr_style, X as slot, $ as bind_props, _ as stringify } from "../../../chunks/index2.js";
import { j as fallback } from "../../../chunks/utils2.js";
function Card($$renderer, $$props) {
  let className = fallback($$props["className"], "");
  let padding = fallback($$props["padding"], "2.25rem");
  $$renderer.push(`<div${attr_class(`card ${stringify(className)}`, "svelte-14efj7c")}${attr_style(`--card-padding: ${stringify(padding)}`)}><!---->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!----></div>`);
  bind_props($$props, { className, padding });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let loading = false;
    $$renderer2.push(`<section class="login-viewport svelte-1x05zx6"><div class="login-container svelte-1x05zx6"><!---->`);
    Card?.($$renderer2, {
      className: "login-section",
      padding: "2.25rem",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="brand svelte-1x05zx6"><div class="logo svelte-1x05zx6">RAMS</div> <div class="title svelte-1x05zx6">Residence Access Management System</div></div> <div class="login-form svelte-1x05zx6"><h2 class="svelte-1x05zx6">Login</h2> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <label class="svelte-1x05zx6">Username <input name="username"${attr("value", username)} autocomplete="username" class="svelte-1x05zx6"/></label> `);
        {
          $$renderer3.push("<!--[!-->");
          {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<button class="login-btn svelte-1x05zx6"${attr("disabled", loading, true)}>${escape_html("Send OTP")}</button>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section>`);
  });
}
export {
  _page as default
};
