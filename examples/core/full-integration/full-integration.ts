import { CoreModule } from '@simplybuilder/core';

const display = CoreModule.createFromStruct({
  struct: {
    element: 'section',
    dataset: { name: 'counter-app' },
    children: [
      { element: 'h2', text: 'Simple Counter' },
      { element: 'p', attr: { id: 'value' }, text: '0' },
      { element: 'button', text: 'Increment' },
    ],
  },
});

document.body.appendChild(display as HTMLElement);

const valueEl = document.getElementById('value');
const btn = document.querySelector('button');

let count = 0;

btn?.addEventListener('click', () => {
  count++;
  if (valueEl) {
    valueEl.textContent = String(count);
  }
});
