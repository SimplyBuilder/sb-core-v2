/**
 * @module DomDatasetModule
 * @description
 * Utility for setting dataset properties on DOM elements.
 * When the dataset name is `state`, the element is automatically
 * registered in the element store for later retrieval.
 */

import { addElementToStore } from './store.js';

interface SetDataData {
  element: HTMLElement | SVGElement;
  dataset: Array<{ name: string; value: string }>;
}

/**
 * Sets dataset properties on a DOM element.
 * If a dataset entry has `name === 'state'`, the element is also
 * registered in the element store using the state value as key.
 *
 * @function setData
 * @param {Object} data - Dataset data.
 * @param {HTMLElement|SVGElement} data.element - The target element.
 * @param {Array<{name: string, value: string}>} data.dataset - Array of dataset name/value pairs.
 */
function setData(data: SetDataData): void {
  const { element, dataset } = data;
  if (!dataset || dataset.length === 0) return;
  for (let i = dataset.length - 1; i >= 0; i--) {
    const item = dataset[i];
    if (item?.name) {
      element.dataset[item.name] = item.value;
      if (item.name === 'state') {
        addElementToStore({ key: item.value, value: element });
      }
    }
  }
}

export { setData };
