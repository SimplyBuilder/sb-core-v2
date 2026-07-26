import { createFromStruct } from '@simplybuilder/core-dom';

const section = createFromStruct({
  struct: {
    element: 'section',
    attr: { class: 'card', id: 'main-card' },
    dataset: { type: 'example', visible: 'true' },
    children: [
      {
        element: 'h2',
        text: 'Struct Example',
      },
      {
        element: 'p',
        text: 'Created with createFromStruct',
        attr: { class: 'description' },
      },
      {
        element: 'ul',
        children: [
          { element: 'li', text: 'Nested children' },
          { element: 'li', text: 'Attributes via attr' },
          { element: 'li', text: 'Dataset via dataset' },
        ],
      },
    ],
  },
});

document.body.appendChild(section as HTMLElement);
