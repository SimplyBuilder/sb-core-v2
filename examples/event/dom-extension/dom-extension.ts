import { EventModule, eventRegister } from '@simplybuilder/core-event';
import { domModuleExtends, createFromStruct } from '@simplybuilder/core-dom';

eventRegister('sayHello', () => console.log('Hello from struct!'));

domModuleExtends(EventModule);

const btn = createFromStruct({
  struct: {
    element: 'button',
    text: 'Say hello',
    event: {
      type: 'click',
      action: 'sayHello',
    },
  },
});

document.body.appendChild(btn);
