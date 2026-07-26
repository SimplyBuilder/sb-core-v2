import { CoreModule } from '@simplybuilder/core';

const root = CoreModule.createFromStruct({
  struct: {
    element: 'section',
    dataset: { name: 'demo-root' },
    children: [
      {
        element: 'h1',
        text: '@simplybuilder/core',
      },
      {
        element: 'p',
        text: 'Demo application running from the monorepo.',
      },
    ],
  },
});

document.getElementById('app')?.appendChild(root);
