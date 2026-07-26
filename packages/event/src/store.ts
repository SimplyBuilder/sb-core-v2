/**
 * @module EventStoreModule
 * @description
 * Manages the storage and lifecycle of event listeners attached to DOM elements.
 * Provides centralized event listener registration, removal, and cleanup
 * with automatic `listener` attribute marking for memory-safe removal.
 */

interface EventEntry {
  type: string;
  handler: EventListener;
  eventId?: string;
  nodeId?: string;
}

interface AddEventData {
  element: EventTarget;
  type: string;
  handler: EventListener;
  eventId?: string;
  nodeId?: string;
}

interface RemoveByIdData {
  element: EventTarget;
  eventId: string;
}

const ActionRefStore = new Map<EventTarget, EventEntry[]>();

/**
 * Clears the event store entry for an element and removes the `listener` attribute.
 * When `force` is true, deletion happens regardless of remaining entries.
 *
 * @private
 * @ignore
 * @function clearEvent
 * @param {EventTarget} element - The DOM element to clear.
 * @param {boolean} [force=false] - Whether to force deletion.
 * @returns {boolean} - Always returns true.
 */
function clearEvent(element: EventTarget, force = false): boolean {
  const entries = ActionRefStore.get(element);
  if (force || (entries && entries.length === 0)) {
    ActionRefStore.delete(element);
    if (element instanceof Element) {
      element.removeAttribute('listener');
    }
  }
  return true;
}

/**
 * Registers an event listener for a DOM element and stores its reference.
 * Sets `listener="true"` attribute on the element for recursive cleanup tracking.
 *
 * @function addEventToStore
 * @param {Object} data - Event registration data.
 * @param {EventTarget} data.element - The DOM element to attach the listener to.
 * @param {string} data.type - The event type (e.g., 'click', 'mouseover').
 * @param {EventListener} data.handler - The event handler function.
 * @param {string} [data.eventId] - Optional unique identifier for this event entry.
 * @param {string} [data.nodeId] - Optional node identifier for the element.
 * @returns {boolean} - True if registration was successful.
 */
function addEventToStore(data: AddEventData): boolean {
  const { element, type, handler, eventId, nodeId } = data;
  if (!element || !type || !handler) return false;
  if (element instanceof Element && !element.getAttribute('listener')) {
    element.setAttribute('listener', 'true');
  }
  if (!ActionRefStore.has(element)) {
    ActionRefStore.set(element, []);
  }
  const entry: EventEntry = { type, handler };
  if (nodeId !== undefined) entry.nodeId = nodeId;
  if (eventId !== undefined) entry.eventId = eventId;
  ActionRefStore.get(element)!.push(entry);
  element.addEventListener(type, handler, false);
  return true;
}

/**
 * Removes all event listeners associated with a DOM element.
 * Iterates the store, calls `removeEventListener` for each entry,
 * then deletes the element from the store and removes the `listener` attribute.
 *
 * @function removeAllEventsFromStore
 * @param {EventTarget} element - The DOM element to remove all events from.
 * @returns {boolean} - True if events were found and removed.
 */
function removeAllEventsFromStore(element: EventTarget): boolean {
  const entries = ActionRefStore.get(element);
  if (!entries || entries.length === 0) return false;
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i];
    if (entry) {
      element.removeEventListener(entry.type, entry.handler, false);
    }
  }
  clearEvent(element, true);
  return true;
}

/**
 * Removes a specific event listener identified by eventId from a DOM element.
 * If no entries remain after removal, the element is cleared from the store.
 *
 * @function removeEventIdFromStore
 * @param {Object} data - Data identifying the event to remove.
 * @param {EventTarget} data.element - The DOM element containing the event.
 * @param {string} data.eventId - The unique identifier of the event to remove.
 * @returns {boolean} - True if the event was found and removed.
 */
function removeEventIdFromStore(data: RemoveByIdData): boolean {
  const { element, eventId } = data;
  const entries = ActionRefStore.get(element);
  if (!entries) return false;
  const index = entries.findIndex((e) => e.eventId === eventId);
  if (index === -1) return false;
  const [removed] = entries.splice(index, 1);
  if (removed) {
    element.removeEventListener(removed.type, removed.handler, false);
  }
  clearEvent(element);
  return true;
}

/**
 * Checks whether a DOM element has registered event listeners.
 *
 * @function hasEvents
 * @param {EventTarget} element - The DOM element to check.
 * @returns {boolean} - True if the element has registered events.
 */
function hasEvents(element: EventTarget): boolean {
  const entries = ActionRefStore.get(element);
  return entries !== undefined && entries.length > 0;
}

/**
 * Clears all event listener references from the store.
 * Does not call `removeEventListener` — use `removeAllEventsFromStore` per element for proper cleanup.
 *
 * @function clear
 */
function clear(): void {
  ActionRefStore.clear();
}

export {
  addEventToStore,
  removeAllEventsFromStore,
  removeEventIdFromStore,
  hasEvents,
  clear,
};
export type { EventEntry, AddEventData, RemoveByIdData };
