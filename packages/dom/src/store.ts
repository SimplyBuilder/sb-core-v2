/**
 * @module DomStoreModule
 * @description
 * Key-value store for DOM element references. Elements can be registered
 * by a string key and retrieved or removed later. Supports two removal modes:
 * mode 1 (with EventModule cleanup) and mode 2 (store only).
 */

const ElementRefStore: Record<string, Element> = {};

/**
 * Registers a DOM element in the store under a unique key.
 * If the key already exists, the operation is silently ignored.
 *
 * @function addElementToStore
 * @param {Object} data - Registration data.
 * @param {string} data.key - Unique identifier for the element.
 * @param {Element} data.value - The DOM element to store.
 */
function addElementToStore(data: { key: string; value: Element }): void {
  const { key, value } = data;
  if (key && value) {
    if (typeof ElementRefStore[key] === 'undefined') {
      ElementRefStore[key] = value;
    }
  }
}

/**
 * Retrieves a stored DOM element by its key.
 *
 * @function getElementFromStore
 * @param {string} key - The element's unique key.
 * @returns {Element|undefined} - The stored element, or undefined.
 */
function getElementFromStore(key: string): Element | undefined {
  if (key) return ElementRefStore[key];
  return undefined;
}

/**
 * Removes a DOM element from the store by its key.
 * In mode 1 (default), calls `EventModule.removeAllEventsFromStore`
 * before deleting. In mode 2, deletes from store only.
 *
 * @function removeElementFromStore
 * @param {Object} data - Removal data.
 * @param {string} data.key - The element's unique key.
 * @param {number} [data.mode=1] - Removal mode: 1 with event cleanup, 2 store only.
 * @param {Object} [data.EventModule] - Optional EventModule for listener cleanup.
 * @returns {boolean} - True if the element was found and removed.
 */
function removeElementFromStore(data: { key: string; mode?: number; EventModule?: Record<string, unknown> }): boolean {
  const { key, mode = 1, EventModule = {} } = data;
  if (!key) return false;
  try {
    const element = ElementRefStore[key];
    if (!element) return false;
    if (mode === 1 && typeof EventModule.removeAllEventsFromStore === 'function') {
      (EventModule.removeAllEventsFromStore as (el: EventTarget) => boolean)(element);
    }
    delete ElementRefStore[key];
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes all entries from the store. Used for testing.
 *
 * @function clearStore
 */
function clearStore(): void {
  for (const key of Object.keys(ElementRefStore)) {
    delete ElementRefStore[key];
  }
}

export {
  addElementToStore,
  getElementFromStore,
  removeElementFromStore,
  clearStore,
};
