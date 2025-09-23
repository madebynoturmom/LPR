import { n as noop } from './utils2-JZdwKo0Y.js';
import './exports-DY9DtolF.js';

const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) {
  ({
    url: new URL("https://example.com")
  });
}
//# sourceMappingURL=state.svelte-0-WklJ7E.js.map
