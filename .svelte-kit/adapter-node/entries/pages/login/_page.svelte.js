import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let loading = false;
    $$renderer2.push(`<section class="login-section svelte-1x05zx6"><div class="login-form svelte-1x05zx6"><h2>Login</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <label class="svelte-1x05zx6">Username <input name="username"${attr("value", username)} autocomplete="username"/></label> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="login-btn svelte-1x05zx6"${attr("disabled", loading, true)}>${escape_html("Send OTP")}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
