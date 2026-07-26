# @simplybuilder/core

Unified integration layer for @simplybuilder/core-event and @simplybuilder/core-dom. Imports both modules and wires them together via `domModuleExtends(EventModule)` for declarative event binding and memory-safe cleanup.

## Installation

```bash
pnpm add @simplybuilder/core
```

## Usage

```typescript
import { CoreModule } from '@simplybuilder/core';

// Register event actions
CoreModule.eventRegister('handleClick', (event) => console.log('Clicked!', event));

// DOM creation with automatic event binding
const btn = CoreModule.createFromStruct({
  struct: { element: 'button', event: { type: 'click', action: 'handleClick' }, text: 'Click me' },
});
// → Event listener attached automatically via domModuleExtends bridge

// Removal with recursive event cleanup
CoreModule.removeElement(btn);
// → Cleans up all listeners in element tree, then removes from DOM
```

## API

All methods are available on the `CoreModule` frozen singleton:

- `CoreModule.name` — Module identifier (`"SBCore"`)
- `CoreModule.version` — Module version
- `CoreModule.eventRegister(name, fn)` — Register a named action for declarative event binding
- `CoreModule.eventUnregister(name)` — Remove a named action
- `CoreModule.getElementFromStore(key)` — Retrieve stored element by key
- `CoreModule.createFromStruct(struct)` — Build nested DOM trees with automatic event binding
- `CoreModule.removeElement(element)` — Remove element with recursive event listener cleanup

## Build from Source

```bash
pnpm install
pnpm build
```
