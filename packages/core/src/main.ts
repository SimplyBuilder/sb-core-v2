/**
 * @module CoreModule
 * @description
 * Unified integration layer for @simplybuilder/core-event and @simplybuilder/core-dom.
 * On initialization, calls `domModuleExtends(EventModule)` to wire the two modules
 * together, enabling declarative event binding in `createFromStruct` and automatic
 * recursive listener cleanup in `removeElement`.
 */

import { domModuleExtends, getElementFromStore, createFromStruct, removeElement } from '@simplybuilder/core-dom';
import { eventRegister, eventUnregister, EventModule } from '@simplybuilder/core-event';

domModuleExtends(EventModule);

const name = "ModuleLibName";
const version = "ModuleLibVersion";

/**
 * Frozen singleton combining DOM and event capabilities.
 * Automatically integrates both modules via `domModuleExtends` at import time.
 *
 * @type {Object}
 * @property {string} name - Module identifier.
 * @property {string} version - Module version.
 * @property {Function} getElementFromStore - Retrieve element from DOM store by key.
 * @property {Function} createFromStruct - Build DOM tree with declarative event binding.
 * @property {Function} removeElement - Remove element with recursive listener cleanup.
 * @property {Function} eventRegister - Register a named event action.
 * @property {Function} eventUnregister - Remove a named event action.
 */
const CoreModule = Object.freeze({
  name,
  version,
  getElementFromStore,
  createFromStruct,
  removeElement,
  eventRegister,
  eventUnregister,
});

export { name, version, CoreModule };
export default CoreModule;
