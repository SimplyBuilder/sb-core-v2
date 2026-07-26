/**
 * @module DomAttributeModule
 * @description
 * Utility functions for setting standard and namespaced attributes on DOM elements.
 */

interface SetAttrData {
  element: HTMLElement | SVGElement;
  attrs: Array<{ name: string; value: string }>;
}

/**
 * Sets standard attributes on a DOM element.
 * Iterates the attributes array and calls `element.setAttribute` for each entry.
 *
 * @function setAttr
 * @param {Object} data - Attribute data.
 * @param {HTMLElement|SVGElement} data.element - The target element.
 * @param {Array<{name: string, value: string}>} data.attrs - Array of attribute name/value pairs.
 */
export function setAttr(data: SetAttrData): void {
  const { element, attrs } = data;
  if (!attrs || attrs.length === 0) return;
  for (let i = attrs.length - 1; i >= 0; i--) {
    const item = attrs[i];
    if (item?.name) {
      element.setAttribute(item.name, item.value);
    }
  }
}

/**
 * Sets namespaced attributes on a DOM element (e.g., SVG attributes).
 * Calls `element.setAttributeNS(null, name, value)` for each entry.
 *
 * @function setAttrNS
 * @param {Object} data - Namespaced attribute data.
 * @param {HTMLElement|SVGElement} data.element - The target element.
 * @param {Array<{name: string, value: string}>} data.attrs - Array of attribute name/value pairs.
 */
export function setAttrNS(data: SetAttrData): void {
  const { element, attrs } = data;
  if (!attrs || attrs.length === 0) return;
  for (let i = attrs.length - 1; i >= 0; i--) {
    const item = attrs[i];
    if (item?.name) {
      element.setAttributeNS(null, item.name, item.value);
    }
  }
}
