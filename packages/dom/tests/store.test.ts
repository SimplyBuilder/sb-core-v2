import { describe, it, expect, beforeEach } from 'vitest';
import {
  addElementToStore,
  getElementFromStore,
  removeElementFromStore,
  clearStore,
} from '../src/store.js';

beforeEach(() => {
  clearStore();
});

describe('addElementToStore', () => {
  it('registers element by key', () => {
    const element = document.createElement('div');
    addElementToStore({ key: 'myDiv', value: element });
    expect(getElementFromStore('myDiv')).toBe(element);
  });

  it('does not overwrite existing key', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('span');
    addElementToStore({ key: 'x', value: el1 });
    addElementToStore({ key: 'x', value: el2 });
    expect(getElementFromStore('x')).toBe(el1);
  });

  it('ignores missing data', () => {
    addElementToStore({ key: '', value: document.createElement('div') });
    expect(getElementFromStore('')).toBeUndefined();
  });
});

describe('getElementFromStore', () => {
  it('returns element for existing key', () => {
    const element = document.createElement('div');
    addElementToStore({ key: 'el', value: element });
    expect(getElementFromStore('el')).toBe(element);
  });

  it('returns undefined for unknown key', () => {
    expect(getElementFromStore('unknown')).toBeUndefined();
  });
});

describe('removeElementFromStore', () => {
  it('removes element (mode 2, store only)', () => {
    const element = document.createElement('div');
    addElementToStore({ key: 'el', value: element });
    const result = removeElementFromStore({ key: 'el', mode: 2 });
    expect(result).toBe(true);
    expect(getElementFromStore('el')).toBeUndefined();
  });

  it('returns false for unknown key', () => {
    expect(removeElementFromStore({ key: 'unknown' })).toBe(false);
  });

  it('mode 1 calls EventModule.removeAllEventsFromStore if provided', () => {
    const element = document.createElement('div');
    element.setAttribute('listener', 'true');
    addElementToStore({ key: 'el', value: element });
    let cleaned = false;
    const fakeEventModule = {
      removeAllEventsFromStore(el: EventTarget) {
        cleaned = true;
        return true;
      },
    };
    removeElementFromStore({ key: 'el', mode: 1, EventModule: fakeEventModule as unknown as Record<string, unknown> });
    expect(cleaned).toBe(true);
    expect(getElementFromStore('el')).toBeUndefined();
  });
});
