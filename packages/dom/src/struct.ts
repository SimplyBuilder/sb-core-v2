/**
 * @module DomStructModule
 * @description
 * Provides declarative DOM tree construction from structured data (ElementStruct)
 * and element removal with recursive event listener cleanup.
 * Integrates with EventModule via the extension system for declarative event binding.
 */

import { createHTMLElement, createSVGElement } from './creator.js';
import { getAnyExtension } from './extension.js';
import { removeElementFromStore } from './store.js';
import type { ElementStruct, CreateHTMLElementOptions, CreateSVGElementOptions } from './types.js';

/**
 * Creates an event listener on a DOM element based on struct configuration.
 * Reads the `EventModule` from registered extensions, looks up the action
 * by name in `EventActions`, and attaches the listener via `addEventToStore`.
 *
 * @private
 * @ignore
 * @function createEventElement
 * @param {Object} data - Event binding data.
 * @param {ElementStruct} data.struct - The element struct containing event config.
 * @param {Element} data.element - The DOM element to attach the listener to.
 */
function createEventElement(data: { struct: ElementStruct; element: Element }): void {
  const { struct, element } = data;
  const eventModule = getAnyExtension();
  if (!eventModule) return;
  if (struct.event?.action && struct.event?.type) {
    const eventActions = eventModule.EventActions as Record<string, EventListener> | undefined;
    if (eventActions && eventActions[struct.event.action]) {
      const eventStoreSchema: {
        element: EventTarget;
        type: string;
        handler: EventListener;
        nodeId?: string;
      } = {
        element,
        type: struct.event.type,
        handler: eventActions[struct.event.action],
      };
      if (struct.event.node) eventStoreSchema.nodeId = struct.event.node;
      const addEvent = eventModule.addEventToStore as (data: Record<string, unknown>) => boolean;
      addEvent(eventStoreSchema);
    }
  }
}

/**
 * Builds a DOM tree from a structured definition.
 * Creates the root element, applies attributes, text, HTML content,
 * optional event bindings, and recursively creates children.
 *
 * @function createFromStruct
 * @param {Object} data - Struct data.
 * @param {ElementStruct} data.struct - The element structure definition.
 * @param {HTMLElement|ShadowRoot} [data.parent=document.body] - Parent element to append to.
 * @returns {Element|false} The created element, or false on failure.
 */
function createFromStruct(data: { struct: ElementStruct; parent?: HTMLElement | ShadowRoot }): Element | false {
  try {
    if (typeof data !== 'object' || !data) return false;
    const { struct, parent = document.body } = data;
    if (!struct?.element) return false;

    const isSvg = struct.type && struct.type.toLowerCase() === 'svg';
    const attrArray = struct.attr ? Object.entries(struct.attr).map(([name, value]) => ({ name, value })) : [];
    const datasetArray = struct.dataset ? Object.entries(struct.dataset).map(([name, value]) => ({ name, value })) : [];

    let element: Element | undefined;

    if (isSvg) {
      const attrNSArray = struct.attrNS ? Object.entries(struct.attrNS).map(([name, value]) => ({ name, value })) : [];
      const svgData: CreateSVGElementOptions = {
        parent: parent as HTMLElement,
        element: {
          type: struct.element,
          attr: attrArray,
          attrNS: attrNSArray,
          dataset: datasetArray,
        },
      };
      element = createSVGElement(svgData);
    } else {
      const htmlData: CreateHTMLElementOptions = {
        parent: parent as HTMLElement,
        element: {
          type: struct.element,
          attr: attrArray,
          dataset: datasetArray,
        },
        shadow: struct.shadow,
      };
      const result = createHTMLElement(htmlData);
      if (result instanceof ShadowRoot) {
        element = result.host as Element;
      } else {
        element = result;
      }
    }

    if (!element) return false;

    if (struct.text !== undefined) {
      element.textContent = struct.text;
    }
    if (struct.html !== undefined) {
      element.innerHTML = struct.html;
    }

    createEventElement({ struct, element });

    if (struct.children && struct.children.length > 0) {
      for (const child of struct.children) {
        createFromStruct({ struct: child, parent: element as HTMLElement });
      }
    }

    return element;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Attempts to clean up an element from the store or its event listeners.
 * If the element has a `data-state` attribute, it removes it from the store
 * (with event cleanup if EventModule is registered). Otherwise, if EventModule
 * is available, it removes all event listeners from the element.
 *
 * @private
 * @ignore
 * @function removeElementFromStoreOrEvents
 * @param {Element} element - The element to clean up.
 * @returns {boolean} - True if cleanup was performed.
 */
function removeElementFromStoreOrEvents(element: Element): boolean {
  try {
    const eventModule = getAnyExtension();
    const htmlElement = element as HTMLElement;
    if (htmlElement.dataset?.state) {
      removeElementFromStore({ key: htmlElement.dataset.state, mode: eventModule ? 1 : 2, EventModule: eventModule });
      return true;
    }
    if (eventModule && typeof eventModule.removeAllEventsFromStore === 'function') {
      const removeAll = eventModule.removeAllEventsFromStore as (el: EventTarget) => boolean;
      removeAll(element);
      return true;
    }
  } catch {
  }
  return false;
}

/**
 * Removes a DOM element and recursively cleans up its children.
 * For each element with `[listener="true"]`, calls `removeAllEventsFromStore`.
 * For each element with `[data-state]`, removes from the element store.
 * Finally removes the element from the DOM.
 *
 * @function removeElement
 * @param {Element} element - The element to remove.
 */
function removeElement(element: Element): void {
  if (!element) return;
  removeElementFromStoreOrEvents(element);

  const listeners = element.querySelectorAll('[listener="true"]');
  for (let i = listeners.length - 1; i >= 0; i--) {
    const item = listeners[i];
    if (item) {
      removeElementFromStoreOrEvents(item);
    }
  }

  const withState = element.querySelectorAll('[data-state]');
  for (let i = withState.length - 1; i >= 0; i--) {
    const item = withState[i];
    if (item) {
      const eventModule = getAnyExtension();
      removeElementFromStore({ key: (item as HTMLElement).dataset.state!, mode: eventModule ? 1 : 2, EventModule: eventModule });
      item.removeAttribute('data-state');
    }
  }

  element.remove();
}

export { createFromStruct, removeElement, createEventElement, removeElementFromStoreOrEvents };
