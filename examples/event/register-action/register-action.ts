import { eventRegister, eventUnregister, hasAction, getAction } from '@simplybuilder/core-event';

eventRegister('handleClick', (event) => {
  console.log('Element clicked', event);
});

eventRegister('handleMouseOver', (event) => {
  console.log('Mouse over', event);
});

console.log(hasAction('handleClick'));
// → true

console.log(hasAction('unknownAction'));
// → false

const handler = getAction('handleClick');
// → (event) => { console.log('Element clicked', event); }

eventUnregister('handleClick');

console.log(hasAction('handleClick'));
// → false
