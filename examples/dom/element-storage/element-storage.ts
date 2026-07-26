import { addElementToStore, getElementFromStore, removeElementFromStore } from '@simplybuilder/core-dom';

const btn = document.createElement('button');
btn.textContent = 'Stored button';
btn.dataset.state = 'my-button';

addElementToStore({ key: 'my-button', value: btn });

const retrieved = getElementFromStore('my-button');
console.log(retrieved === btn);
// → true

removeElementFromStore({ key: 'my-button', mode: 2 });

const after = getElementFromStore('my-button');
console.log(after);
// → undefined
