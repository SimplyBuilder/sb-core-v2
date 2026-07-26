import { createHTMLElement } from '@simplybuilder/core-dom';

const shadowHost = createHTMLElement({
  element: {
    type: 'div',
    dataset: [{ name: 'state', value: 'shadow-demo' }],
  },
  shadow: 'open',
}) as HTMLElement;

if (shadowHost.shadowRoot) {
  shadowHost.shadowRoot.innerHTML = `<p>Rendered inside shadow DOM</p>`;
}

document.body.appendChild(shadowHost);
