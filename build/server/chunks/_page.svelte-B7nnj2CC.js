import { b as attr } from './attributes-Y1rI5qy_.js';
import { g as get } from './index-CEe3a8vz.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { p as page } from './stores-BGw6gdkl.js';
import { C as Card } from './Card-Teaqb2dm.js';
import './utils2-JZdwKo0Y.js';
import './context-BatlNbRu.js';
import './exports-DY9DtolF.js';
import './state.svelte-0-WklJ7E.js';
import './index2-CW9yIE9Z.js';

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

export { _page as default };
//# sourceMappingURL=_page.svelte-B7nnj2CC.js.map
