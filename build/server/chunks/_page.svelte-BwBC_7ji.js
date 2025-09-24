import { b as attr } from './attributes-Y1rI5qy_.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { C as Card } from './Card-Teaqb2dm.js';
import './index2-CW9yIE9Z.js';
import './context-BatlNbRu.js';
import './utils2-JZdwKo0Y.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let loading = false;
    $$renderer2.push(`<section class="login-viewport svelte-3pr6iq"><div class="login-container svelte-3pr6iq"><!---->`);
    Card?.($$renderer2, {
      className: "login-section",
      padding: "2.25rem",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="brand"><div class="logo">RAMS</div> <div class="title">Residence Access Management System</div></div> <div class="login-form"><h2>Forgot password</h2> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <label>Username or email <input${attr("value", username)} autocomplete="username"/></label> <button class="login-btn"${attr("disabled", loading, true)}>${escape_html("Request reset")}</button></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BwBC_7ji.js.map
