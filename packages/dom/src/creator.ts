/**
 * @module DomComponentModule
 * @description
 * Provides functions for creating and appending HTML and SVG elements.
 * Handles attribute assignment, dataset configuration, and shadow DOM creation.
 */

import { setAttr, setAttrNS } from './attributes.js';
import { setData } from './dataset.js';
import type { ShadowConfig, CreateHTMLElementOptions, CreateSVGElementOptions } from './types.js';

/**
 * A unique symbol used as a key to store the original `attachShadow` method in a secure manner.
 * This symbol ensures that the reference is not accessible through direct property enumeration
 * or accidental overrides.
 *
 * @ignore
 * @private
 */
const SimplyBuilderAttachShadowSymbol: unique symbol = Symbol("Simply Builder AttachShadow Freeze");

/**
 * The type of the native `attachShadow` method captured from an isolated Realm.
 */
type NativeAttachShadow = typeof HTMLElement.prototype.attachShadow;

/**
 * The shape of the frozen store holding the native `attachShadow` reference.
 */
type SimplyBuilderAttachShadowStoreType = {
  readonly [SimplyBuilderAttachShadowSymbol]: NativeAttachShadow;
};

/**
 * A temporary iframe element used to access a clean reference to `HTMLElement.prototype.attachShadow`.
 * The iframe is appended to the document's body, creating an isolated Realm
 * to obtain the original method untouched by any potential modifications in the main document context.
 * After obtaining the method, the iframe is removed to clean up the environment.
 *
 * @ignore
 * @private
 */
const temporaryFrame: HTMLIFrameElement = document.createElement("iframe");
temporaryFrame.setAttribute("style", "display:none!important");
temporaryFrame.setAttribute("sandbox", "allow-same-origin");
document.body.appendChild(temporaryFrame);

/**
 * Stores the original `attachShadow` method retrieved from the iframe's content window.
 * This method is then frozen to prevent any modifications, ensuring its integrity.
 * The storage object uses `SimplyBuilderAttachShadowSymbol` as a key for secure access.
 *
 * @ignore
 * @private
 */
const SimplyBuilderAttachShadowStore: SimplyBuilderAttachShadowStoreType = {
  [SimplyBuilderAttachShadowSymbol]: (temporaryFrame.contentWindow as any)["HTMLElement"].prototype.attachShadow
};

/**
 * Immediately freezes the store to ensure the stored `attachShadow` method
 * cannot be modified or deleted, providing an immutable reference
 * for the duration of the application lifecycle.
 */
Object.freeze(SimplyBuilderAttachShadowStore);

/**
 * Removes the temporary iframe from the DOM to clean up and prevent any memory leaks.
 * This step is crucial to ensure that the iframe does not persist in the DOM tree,
 * which could lead to unnecessary resource usage or potential security concerns.
 */
temporaryFrame.parentNode!.removeChild(temporaryFrame);

/**
 * Attaches a shadow root to an HTML element with the specified mode.
 *
 * @function attachShadow
 * @param {HTMLElement} host - The element to attach the shadow root to.
 * @param {'open'|'closed'} mode - The shadow DOM mode.
 * @returns {ShadowRoot} The created shadow root.
 */
function attachShadow(host: HTMLElement, mode: 'open' | 'closed'): ShadowRoot {
  return SimplyBuilderAttachShadowStore[SimplyBuilderAttachShadowSymbol].call(host, {mode});
}

/**
 * Creates a shadow root from a string or object configuration.
 * String mode creates a shadow root with that mode ('open'/'closed').
 * Object mode can additionally include `styles` via CSSStyleSheet.
 *
 * @function createShadowFromConfig
 * @param {HTMLElement} host - The element to attach the shadow root to.
 * @param {ShadowConfig} shadow - Shadow configuration (string or object with mode/styles).
 * @returns {ShadowRoot|undefined} The created shadow root, or undefined on failure.
 */
export function createShadowFromConfig(host: HTMLElement, shadow: ShadowConfig): ShadowRoot | undefined {
  if (typeof shadow === 'string') {
    return attachShadow(host, shadow as 'open' | 'closed');
  }
  if (typeof shadow === 'object' && shadow !== null && 'mode' in shadow) {
    const config = shadow as { mode: 'open' | 'closed'; styles?: string };
    const root = attachShadow(host, config.mode);
    if (config.styles && typeof CSSStyleSheet !== 'undefined') {
      try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(config.styles);
        root.adoptedStyleSheets = [sheet];
      } catch {
      }
    }
    return root;
  }
  return undefined;
}

/**
 * Applies attributes, namespaced attributes, and dataset to an element.
 *
 * @private
 * @ignore
 * @function applyAttributes
 * @param {HTMLElement|SVGElement} element - The target element.
 * @param {Object} data - Element configuration with attr/attrNS/dataset arrays.
 */
function applyAttributes(element: HTMLElement | SVGElement, data: CreateHTMLElementOptions['element'] | CreateSVGElementOptions['element']): void {
  if (data.attr?.length) {
    setAttr({ element, attrs: data.attr });
  }
  if ('attrNS' in data && data.attrNS?.length) {
    setAttrNS({ element, attrs: data.attrNS as Array<{ name: string; value: string }> });
  }
  if (data.dataset?.length) {
    setData({ element, dataset: data.dataset });
  }
}

/**
 * Creates an HTML element and appends it to a parent.
 * Supports attribute assignment and dataset configuration with automatic
 * store registration.
 *
 * @function createHTMLElement
 * @param {Object} [data] - Element creation options.
 * @param {HTMLElement|ShadowRoot} [data.parent=document.body] - Parent element to append to.
 * @param {Object} data.element - Element definition with type, attr, and dataset arrays.
 * @param {string} data.element.type - HTML tag name (e.g., 'div', 'button').
 * @param {Array} [data.element.attr] - Array of {name, value} attribute pairs.
 * @param {Array} [data.element.dataset] - Array of {name, value} dataset pairs.
 * @returns {HTMLElement|undefined} The created element, or undefined on error.
 */
export function createHTMLElement(data: CreateHTMLElementOptions = {} as CreateHTMLElementOptions): HTMLElement | undefined {
  try {
    const { parent, element: elementData } = data;
    const element = document.createElement(elementData.type);
    applyAttributes(element, elementData);

    const targetParent = parent ?? document.body;
    if (targetParent instanceof HTMLElement || targetParent instanceof SVGElement || targetParent instanceof ShadowRoot) {
      targetParent.appendChild(element);
    }

    return element;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

/**
 * Creates an SVG element and appends it to a parent.
 * Supports standard and namespaced attributes, and dataset configuration.
 *
 * @function createSVGElement
 * @param {Object} [data] - Element creation options.
 * @param {SVGElement|HTMLElement} [data.parent] - Parent element to append to.
 * @param {Object} data.element - Element definition.
 * @param {string} data.element.type - SVG tag name (e.g., 'circle', 'rect').
 * @param {Array} [data.element.attr] - Array of {name, value} attribute pairs.
 * @param {Array} [data.element.attrNS] - Array of {name, value} namespaced attribute pairs.
 * @param {Array} [data.element.dataset] - Array of {name, value} dataset pairs.
 * @returns {SVGElement|undefined} The created SVG element, or undefined on error.
 */
export function createSVGElement(data: CreateSVGElementOptions = {} as CreateSVGElementOptions): SVGElement | undefined {
  try {
    const { parent, element: elementData } = data;
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementData.type);
    applyAttributes(element, elementData);

    if (parent) {
      if (parent instanceof HTMLElement || parent instanceof SVGElement) {
        parent.appendChild(element);
      }
    }

    return element;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
