import { e as escape_html } from './escaping-CqgfEcN3.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<main style="padding:2rem;" class="svelte-11kazgp"><h1>Theme test</h1> <p>Current data-theme: <strong>${escape_html(typeof document !== "undefined" ? document.documentElement.dataset.theme : "ssr")}</strong></p> <button class="theme-toggle-btn" style="padding:0.6rem 1rem;border-radius:8px;border:1px solid #ccc">Toggle theme</button></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DrGrKuCl.js.map
