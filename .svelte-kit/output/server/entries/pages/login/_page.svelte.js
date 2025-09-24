import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { C as Card } from "../../../chunks/Card.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let loading = false;
    let remember = false;
    $$renderer2.push(`<section class="login-viewport"><div class="login-container"><!---->`);
    Card?.($$renderer2, {
      className: "login-section",
      padding: "2.25rem",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="brand"><div class="logo">RAMS</div> <div class="title">Residence Access Management System</div></div> <div class="login-form"><h2>Login</h2> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <label>Username <input name="username"${attr("value", username)} autocomplete="username"/></label> <div class="login-helpers"><label class="remember-label" for="remember"><input id="remember" type="checkbox"${attr("checked", remember, true)} aria-label="Remember me"/> <span class="remember-text">Remember me</span></label> <a href="/login/forgot" class="forgot-link">Forgot password?</a></div> `);
        {
          $$renderer3.push("<!--[!-->");
          {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<button class="login-btn"${attr("disabled", loading, true)}>${escape_html("Send OTP")}</button>`);
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
