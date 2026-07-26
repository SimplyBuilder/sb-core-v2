import { CoreModule } from '@simplybuilder/core';

CoreModule.eventRegister('handleClick', () => {
  console.log('Button clicked via core bridge');
});

const btn = CoreModule.createFromStruct({
  struct: {
    element: 'button',
    text: 'Click me',
    event: {
      type: 'click',
      action: 'handleClick',
    },
  },
});

document.body.appendChild(btn as HTMLElement);
