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
 * Attaches a shadow root to an HTML element with the specified mode.
 *
 * @function attachShadow
 * @param {HTMLElement} host - The element to attach the shadow root to.
 * @param {'open'|'closed'} mode - The shadow DOM mode.
 * @returns {ShadowRoot} The created shadow root.
 */
function attachShadow(host: HTMLElement, mode: 'open' | 'closed'): ShadowRoot {
  return host.attachShadow({ mode });
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
 * @param {Object} [options] - Element creation options.
 * @param {HTMLElement|ShadowRoot} [options.parent=document.body] - Parent element to append to.
 * @param {Object} options.element - Element definition with type, attr, and dataset arrays.
 * @param {string} options.element.type - HTML tag name (e.g., 'div', 'button').
 * @param {Array} [options.element.attr] - Array of {name, value} attribute pairs.
 * @param {Array} [options.element.dataset] - Array of {name, value} dataset pairs.
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
 * @param {Object} [options] - Element creation options.
 * @param {SVGElement|HTMLElement} [options.parent] - Parent element to append to.
 * @param {Object} options.element - Element definition.
 * @param {string} options.element.type - SVG tag name (e.g., 'circle', 'rect').
 * @param {Array} [options.element.attr] - Array of {name, value} attribute pairs.
 * @param {Array} [options.element.attrNS] - Array of {name, value} namespaced attribute pairs.
 * @param {Array} [options.element.dataset] - Array of {name, value} dataset pairs.
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
