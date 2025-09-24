import { a as attr } from "../../../../../chunks/attributes.js";
import { g as get } from "../../../../../chunks/index.js";
import { e as escape_html } from "../../../../../chunks/escaping.js";
import { p as page } from "../../../../../chunks/stores.js";
import { C as Card } from "../../../../../chunks/Card.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let password = "";
    let passwordConfirm = "";
    let loading = false;
    get(page).params.token;
    $$renderer2.push(`<section class="login-viewport svelte-pkniy0"><div class="login-container svelte-pkniy0"><!---->`);
    Card?.($$renderer2, {
      className: "login-section",
      padding: "2.25rem",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="brand"><div class="logo">RAMS</div> <div class="title">Residence Access Management System</div></div> <div class="login-form"><h2>Reset password</h2> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <label>New password <input type="password"${attr("value", password)} autocomplete="new-password"/></label> <label>Confirm password <input type="password"${attr("value", passwordConfirm)} autocomplete="new-password"/></label> <button class="login-btn"${attr("disabled", loading, true)}>${escape_html("Reset password")}</button></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section>`);
  });
}
export {
  _page as default
};
