# @simplybuilder/core-event

Event management module for @simplybuilder/core. Provides event listener registration, storage, and cleanup with `[listener="true"]` marking for memory-safe removal.

## Installation

```bash
pnpm add @simplybuilder/core-event
```

## Usage

```typescript
import { eventRegister, eventUnregister, addEventToStore, removeAllEventsFromStore, EventModule } from '@simplybuilder/core-event';

// Register named actions
eventRegister('handleClick', (event) => console.log('Clicked!', event));

// Attach to DOM elements
const btn = document.createElement('button');
addEventToStore({ element: btn, type: 'click', handler: 'handleClick' });
// → sets btn.getAttribute('listener') === 'true'
// → calls btn.addEventListener('click', handler)

// Clean up when done
removeAllEventsFromStore(btn);
// → calls btn.removeEventListener for each handler
// → removes 'listener' attribute
```

## API

- `eventRegister(name, fn)` — Register a named action (case-insensitive)
- `eventUnregister(name)` — Remove a named action
- `addEventToStore({ element, type, handler, eventId?, nodeId? })` — Attach event listener, sets `listener="true"`
- `removeAllEventsFromStore(element)` — Remove all listeners from element, clean up `listener` attribute
- `removeEventIdFromStore({ element, eventId })` — Remove a specific listener by eventId
- `EventActions` — Public lookup object for action resolution (used by domModuleExtends)
- `EventTypes` — Public lookup of registered event type names
- `EventModule` — Frozen singleton with all capabilities

## Build from Source

```bash
pnpm install
pnpm build
```
