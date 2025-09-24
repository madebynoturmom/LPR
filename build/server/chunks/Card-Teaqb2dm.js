import { a as attr_class, g as attr_style, b as slot, f as bind_props, d as stringify } from './index2-CW9yIE9Z.js';
import { j as fallback } from './utils2-JZdwKo0Y.js';

function Card($$renderer, $$props) {
  let className = fallback($$props["className"], "");
  let padding = fallback($$props["padding"], "2.25rem");
  $$renderer.push(`<div${attr_class(`card ${stringify(className)}`, "svelte-14efj7c")}${attr_style(`--card-padding: ${stringify(padding)}`)}><!---->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!----></div>`);
  bind_props($$props, { className, padding });
}

export { Card as C };
//# sourceMappingURL=Card-Teaqb2dm.js.map
