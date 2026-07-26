import { addEventToStore, removeAllEventsFromStore, hasEvents } from '@simplybuilder/core-event';

const btn = document.createElement('button');
btn.textContent = 'Click me';

addEventToStore({
  element: btn,
  type: 'click',
  handler: () => console.log('Button clicked'),
});

console.log(btn.getAttribute('listener'));
// → "true"

console.log(hasEvents(btn));
// → true

removeAllEventsFromStore(btn);

console.log(btn.getAttribute('listener'));
// → null (attribute removed)

console.log(hasEvents(btn));
// → false
