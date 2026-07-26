/**
 * @module DomModule
 * @description
 * Central module for DOM manipulation in @simplybuilder/core. Provides element
 * creation, attribute management, declarative DOM tree construction, element
 * removal with recursive event cleanup, and an extension system for optional
 * integration with @simplybuilder/core-event.
 */

import { addElementToStore, getElementFromStore, removeElementFromStore, clearStore } from './store.js';
import { domModuleExtends, validVersionSupport } from './extension.js';
import { setAttr, setAttrNS } from './attributes.js';
import { setData } from './dataset.js';
import { createHTMLElement, createSVGElement } from './creator.js';
import { createFromStruct, removeElement, createEventElement } from './struct.js';

export {
  addElementToStore,
  getElementFromStore,
  removeElementFromStore,
  clearStore,
  domModuleExtends,
  validVersionSupport,
  setAttr,
  setAttrNS,
  setData,
  createHTMLElement,
  createSVGElement,
  createFromStruct,
  removeElement,
  createEventElement,
};

export type {
  ElementStruct,
  EventStruct,
  ShadowConfig,
  ShadowConfigString,
  ShadowConfigObject,
  CreateHTMLElementOptions,
  CreateSVGElementOptions,
} from './types.js';

const name = "ModuleLibName";
const version = "ModuleLibVersion";

/**
 * Frozen singleton combining all DOM manipulation capabilities.
 * Pass `domModuleExtends()` to register an EventModule for declarative
 * event binding in `createFromStruct` and automatic listener cleanup in `removeElement`.
 *
 * @type {Object}
 * @property {string} name - Module identifier.
 * @property {string} version - Module version.
 * @property {Function} domModuleExtends - Register an extension module.
 * @property {Function} createHTMLElement - Create and append HTML elements.
 * @property {Function} createSVGElement - Create and append SVG elements.
 * @property {Function} addElementToStore - Store element reference by key.
 * @property {Function} getElementFromStore - Retrieve stored element.
 * @property {Function} removeElementFromStore - Remove element from store.
 * @property {Function} createFromStruct - Build DOM tree from struct definition.
 * @property {Function} removeElement - Remove element with listener cleanup.
 */
const DomModule = Object.freeze({
  name,
  version,
  domModuleExtends,
  createHTMLElement,
  createSVGElement,
  addElementToStore,
  getElementFromStore,
  removeElementFromStore,
  createFromStruct,
  removeElement,
});

export { name, version, DomModule };
export default DomModule;
