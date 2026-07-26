# @simplybuilder/core-dom

DOM manipulation module for @simplybuilder/core. Provides element creation, attribute management, DOM tree construction, and element removal with optional event module integration.

## Installation

```bash
pnpm add @simplybuilder/core-dom
```

## Usage

```typescript
import { createHTMLElement, createSVGElement, createFromStruct, removeElement, domModuleExtends } from '@simplybuilder/core-dom';

// Simple element creation
const btn = createHTMLElement({
  element: { type: 'button', attr: [{ name: 'class', value: 'primary' }] },
});

// Nested DOM from struct
const section = createFromStruct({
  struct: {
    element: 'section',
    dataset: { state: 'main' },
    children: [
      { element: 'h1', text: 'Title' },
      { element: 'p', text: 'Content' },
    ],
  },
});

// Element removal with cleanup
removeElement(section);
// → removes from store, cleans up event listeners, removes from DOM

// Integration with event module (optional, zero dependency)
import { eventRegister, addEventToStore, removeAllEventsFromStore } from '@simplybuilder/core-event';

domModuleExtends({
  name: 'SBCoreEvent',
  version: '2.0.0',
  EventActions: { /* registered actions */ },
  addEventToStore,
  removeAllEventsFromStore,
});

// Now createFromStruct processes struct.event config
const el = createFromStruct({
  struct: { element: 'button', event: { type: 'click', action: 'handleClick' } },
});
```

## API

- `domModuleExtends(data)` — Register an extension module (e.g., EventModule) for declarative event binding
- `createHTMLElement(options)` — Create HTML elements with attributes, dataset, shadow DOM
- `createSVGElement(options)` — Create SVG elements with namespaced attributes
- `createFromStruct(struct)` — Build nested DOM trees from struct with optional event binding
- `removeElement(element)` — Remove element, clean up store and event listeners recursively
- `addElementToStore({ key, value })` — Store element reference by key
- `getElementFromStore(key)` — Retrieve stored element by key
- `removeElementFromStore({ key, mode, EventModule? })` — Remove from store (mode 1: with event cleanup, mode 2: store only)
- `setAttr({ element, attrs })` — Set attributes on element
- `setAttrNS({ element, attrs })` — Set namespaced attributes
- `setData({ element, dataset })` — Set dataset properties
- `DomModule` — Frozen singleton with all capabilities

## Build from Source

```bash
pnpm install
pnpm build
```
