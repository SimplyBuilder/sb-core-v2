/**
 * @module DomExtensionModule
 * @description
 * Extension system for the DOM module. Allows external modules (e.g., EventModule)
 * to register themselves via `domModuleExtends()` and hook into the DOM creation
 * and removal pipeline. Version validation ensures compatibility at runtime.
 */



interface ModuleData {
  name: string;
  version: string;
  [key: string]: unknown;
}

/**
 * Internal store for module metadata, registered extensions, and version constraints.
 *
 * @private
 * @ignore
 * @type {Object}
 */
const internalStore: {
  app: { name: string; version: string };
  register: Record<string, ModuleData>;
  allow: Record<string, { major?: number; minor?: number; patch?: number }>;
  clearExtensions: () => void;
} = {
  app: {
    name: 'DomModule',
    version: "ModuleLibVersion",
  },
  register: {},
    allow: {
    SBCoreEvent: { major: 2 },
  },
  clearExtensions() {
    for (const key of Object.keys(this.register)) {
      delete this.register[key];
    }
  },
};

/**
 * Validates that a module's version meets the minimum version requirements
 * defined in `internalStore.allow`. Checks major, minor, and patch levels.
 *
 * @function validVersionSupport
 * @param {Object} data - Module data with name and version.
 * @param {string} data.name - Module identifier (e.g., 'EventModule').
 * @param {string} data.version - Semantic version string (e.g., '1.0.0').
 * @returns {boolean} - True if the module version is supported.
 */
function validVersionSupport(data: ModuleData): boolean {
  const { name, version } = data;
  const constraint = internalStore.allow[name];
  if (constraint && version) {
    const arrVersion = version.split('.');
    if (arrVersion.length >= 1) {
      if (constraint.major !== undefined && arrVersion[0] && constraint.major > Number(arrVersion[0])) return false;
      if (constraint.minor !== undefined && arrVersion[1] && constraint.minor > Number(arrVersion[1])) return false;
      if (constraint.patch !== undefined && arrVersion[2] && constraint.patch > Number(arrVersion[2])) return false;
    }
    return true;
  }
  return false;
}

/**
 * Registers an external module for DOM module integration.
 * Validates version compatibility before storing.
 * The registered module is then available to `createEventElement` and
 * `removeElement` for declarative event binding and cleanup.
 *
 * @function domModuleExtends
 * @param {Object} data - Module data.
 * @param {string} data.name - Module identifier stored as key.
 * @param {string} data.version - Module version for compatibility check.
 * @returns {boolean} - True if registration was successful.
 */
function domModuleExtends(data: ModuleData): boolean {
  try {
    const { name } = data;
    if (validVersionSupport(data)) {
      internalStore.register[name] = data;
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Retrieves a registered extension module by name.
 *
 * @function getExtension
 * @param {string} name - The module identifier.
 * @returns {Object|undefined} - The registered module data, or undefined.
 */
function getExtension(name: string): ModuleData | undefined {
  return internalStore.register[name];
}

/**
 * Returns the first registered extension, regardless of name.
 * Used by struct.ts to find the EventModule without knowing its name.
 *
 * @function getAnyExtension
 * @returns {Object|undefined} - The first registered module, or undefined.
 */
function getAnyExtension(): ModuleData | undefined {
  for (const key of Object.keys(internalStore.register)) {
    return internalStore.register[key];
  }
  return undefined;
}

/**
 * Removes all registered extensions. Used for testing.
 *
 * @function clearExtensions
 */
function clearExtensions(): void {
  for (const key of Object.keys(internalStore.register)) {
    delete internalStore.register[key];
  }
}

export {
  internalStore,
  validVersionSupport,
  domModuleExtends,
  getExtension,
  getAnyExtension,
  clearExtensions,
};
export type { ModuleData };
