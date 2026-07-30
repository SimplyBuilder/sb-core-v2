import { createHTMLElement, getElementFromStore } from '@simplybuilder/core-dom';

const shadowHost = createHTMLElement({
  element: {
    type: 'div',
    dataset: [{ name: 'state', value: 'shadow-demo' }],
  },
}) as HTMLElement;

const storedEl = getElementFromStore('shadow-demo') as HTMLElement | undefined;
const shadowRoot = storedEl?.attachShadow({ mode: 'open' });
if (shadowRoot) {
  shadowRoot.innerHTML = `<p>Rendered inside shadow DOM</p>`;
}

document.body.appendChild(shadowHost);
