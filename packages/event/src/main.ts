/**
 * @module EventModule
 * @description
 * Central module for event management in @simplybuilder/core.
 * Exports a frozen singleton with named action registration and
 * DOM event listener storage with automatic cleanup tracking.
 *
 * Integrates with @simplybuilder/core-dom via `domModuleExtends`
 * for declarative event binding in `createFromStruct`.
 */



import {
  EventTypes as _EventTypes,
  EventActions as _EventActions,
  eventRegister,
  eventUnregister,
  getAction,
  hasAction,
  clearRegistry,
} from './registry.js';

import {
  addEventToStore,
  removeAllEventsFromStore,
  removeEventIdFromStore,
  hasEvents,
  clear,
} from './store.js';

export {
  _EventTypes as EventTypes,
  _EventActions as EventActions,
  eventRegister,
  eventUnregister,
  getAction,
  hasAction,
  clearRegistry,
  addEventToStore,
  removeAllEventsFromStore,
  removeEventIdFromStore,
  hasEvents,
  clear,
};

const name = "ModuleLibName";
const version = "ModuleLibVersion";

/**
 * Frozen singleton combining event store and registry capabilities.
 * Pass this object to `domModuleExtends()` to enable declarative
 * event binding in DOM module's `createFromStruct`.
 *
 * @type {Object}
 * @property {string} name - Module identifier.
 * @property {string} version - Module version.
 * @property {Object} EventTypes - Registered event type names (case-insensitive keys).
 * @property {Object.<string, EventListener>} EventActions - Registered action handlers by display name.
 * @property {Function} eventRegister - Register a named action.
 * @property {Function} eventUnregister - Remove a named action.
 * @property {Function} addEventToStore - Attach event listener to element.
 * @property {Function} removeAllEventsFromStore - Remove all listeners from element.
 * @property {Function} removeEventIdFromStore - Remove a specific listener by eventId.
 */
const EventModule = Object.freeze({
  name,
  version,
  EventTypes: _EventTypes,
  EventActions: _EventActions,
  eventRegister,
  eventUnregister,
  addEventToStore,
  removeAllEventsFromStore,
  removeEventIdFromStore,
});

export { name, version, EventModule };
export default EventModule;
