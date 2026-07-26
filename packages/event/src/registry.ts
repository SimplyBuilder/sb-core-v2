/**
 * @module EventRegistryModule
 * @description
 * Manages named event actions for declarative event binding.
 * Actions are stored case-insensitively and exposed via `EventActions`
 * for lookup by the DOM module's `createEventElement` pipeline.
 */

const EventTypes: Record<string, string> = {};
const EventActions: Record<string, EventListener> = {};

/**
 * Registers a named action for event binding.
 * The name is stored case-insensitively. If the action name already exists,
 * registration is rejected to prevent duplicate handlers.
 *
 * @function eventRegister
 * @param {string} name - The name of the action to register.
 * @param {EventListener} fn - The handler function.
 * @returns {boolean} - True if registration was successful.
 */
function eventRegister(name: string, fn: EventListener): boolean {
  if (!name || !fn) return false;
  const key = name.toUpperCase();
  if (EventTypes[key]) return false;
  EventTypes[key] = name;
  EventActions[EventTypes[key]] = fn;
  return true;
}

/**
 * Removes a previously registered action by name.
 * Case-insensitive matching.
 *
 * @function eventUnregister
 * @param {string} name - The name of the action to remove.
 * @returns {boolean} - True if the action was found and removed.
 */
function eventUnregister(name: string): boolean {
  if (!name) return false;
  const key = name.toUpperCase();
  const eventName = EventTypes[key];
  if (!eventName) return false;
  delete EventTypes[key];
  if (EventActions[eventName]) {
    delete EventActions[eventName];
  }
  return true;
}

/**
 * Retrieves a registered action handler by its display name.
 * The name must match exactly as registered (not case-insensitive).
 *
 * @function getAction
 * @param {string} name - The display name of the action.
 * @returns {EventListener|undefined} - The handler function, or undefined.
 */
function getAction(name: string): EventListener | undefined {
  if (!name) return undefined;
  return EventActions[name];
}

/**
 * Checks whether an action name is registered.
 * Case-insensitive matching.
 *
 * @function hasAction
 * @param {string} name - The name to check.
 * @returns {boolean} - True if the action is registered.
 */
function hasAction(name: string): boolean {
  if (!name) return false;
  return !!EventTypes[name.toUpperCase()];
}

/**
 * Removes all registered actions and types. Used for testing.
 *
 * @function clearRegistry
 */
function clearRegistry(): void {
  for (const key of Object.keys(EventTypes)) {
    delete EventTypes[key];
  }
  for (const key of Object.keys(EventActions)) {
    delete EventActions[key];
  }
}

export {
  EventTypes,
  EventActions,
  eventRegister,
  eventUnregister,
  getAction,
  hasAction,
  clearRegistry,
};
