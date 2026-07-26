import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  addEventToStore,
  removeAllEventsFromStore,
  removeEventIdFromStore,
  hasEvents,
  clear,
  eventRegister,
  eventUnregister,
  getAction,
  hasAction,
  clearRegistry,
  EventActions,
  EventTypes,
} from '../src/main.js';

beforeEach(() => {
  clear();
  clearRegistry();
});

describe('eventRegister / eventUnregister', () => {
  it('eventRegister() stores action', () => {
    const handler = vi.fn();
    const result = eventRegister('handleClick', handler);
    expect(result).toBe(true);
    expect(hasAction('handleClick')).toBe(true);
    expect(getAction('handleClick')).toBe(handler);
  });

  it('eventRegister() prevents duplicates', () => {
    eventRegister('handleClick', vi.fn());
    const result = eventRegister('handleClick', vi.fn());
    expect(result).toBe(false);
  });

  it('eventRegister() is case-insensitive', () => {
    const handler = vi.fn();
    eventRegister('Click', handler);
    expect(getAction('Click')).toBe(handler);
    expect(hasAction('CLICK')).toBe(true);
  });

  it('eventRegister() returns false for missing data', () => {
    expect(eventRegister('', vi.fn())).toBe(false);
    expect(eventRegister('click', undefined as any)).toBe(false);
  });

  it('eventUnregister() removes action', () => {
    eventRegister('handleClick', vi.fn());
    const result = eventUnregister('handleClick');
    expect(result).toBe(true);
    expect(hasAction('handleClick')).toBe(false);
  });

  it('eventUnregister() returns false for unknown name', () => {
    expect(eventUnregister('unknown')).toBe(false);
  });

  it('getAction() returns undefined for unknown name', () => {
    expect(getAction('unknown')).toBeUndefined();
  });

  it('EventActions and EventTypes reflect registered actions', () => {
    const handler = vi.fn();
    eventRegister('handleClick', handler);
    expect(EventActions['handleClick']).toBe(handler);
    expect(EventTypes['HANDLECLICK']).toBe('handleClick');
  });
});

describe('addEventToStore', () => {
  it('registers handler and sets listener attribute', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    const result = addEventToStore({ element, type: 'click', handler });
    expect(result).toBe(true);
    expect(hasEvents(element)).toBe(true);
    expect(element.getAttribute('listener')).toBe('true');
  });

  it('returns false for missing data', () => {
    const element = document.createElement('div');
    expect(addEventToStore({ element, type: '', handler: vi.fn() })).toBe(false);
    expect(addEventToStore({ element, type: 'click', handler: undefined as any })).toBe(false);
  });

  it('stores eventId and nodeId', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    addEventToStore({ element, type: 'click', handler, eventId: 'e1', nodeId: 'n1' });
    expect(hasEvents(element)).toBe(true);
    expect(element.getAttribute('listener')).toBe('true');
  });

  it('fires handler on event', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    addEventToStore({ element, type: 'click', handler });
    element.dispatchEvent(new Event('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe('removeAllEventsFromStore', () => {
  it('cleans up all handlers and removes listener attribute', () => {
    const element = document.createElement('div');
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    addEventToStore({ element, type: 'click', handler: handler1 });
    addEventToStore({ element, type: 'mouseover', handler: handler2 });
    expect(hasEvents(element)).toBe(true);
    const result = removeAllEventsFromStore(element);
    expect(result).toBe(true);
    expect(hasEvents(element)).toBe(false);
    expect(element.getAttribute('listener')).toBeNull();
  });

  it('prevents handler from firing after cleanup', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    addEventToStore({ element, type: 'click', handler });
    removeAllEventsFromStore(element);
    element.dispatchEvent(new Event('click'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns false for unknown element', () => {
    const element = document.createElement('div');
    expect(removeAllEventsFromStore(element)).toBe(false);
  });
});

describe('removeEventIdFromStore', () => {
  it('removes specific handler by eventId', () => {
    const element = document.createElement('div');
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    addEventToStore({ element, type: 'click', handler: handler1, eventId: 'e1' });
    addEventToStore({ element, type: 'click', handler: handler2, eventId: 'e2' });
    const result = removeEventIdFromStore({ element, eventId: 'e1' });
    expect(result).toBe(true);
    expect(hasEvents(element)).toBe(true);
  });

  it('returns false for unknown eventId', () => {
    const element = document.createElement('div');
    addEventToStore({ element, type: 'click', handler: vi.fn(), eventId: 'e1' });
    expect(removeEventIdFromStore({ element, eventId: 'unknown' })).toBe(false);
  });

  it('removes listener attribute when last event removed', () => {
    const element = document.createElement('div');
    addEventToStore({ element, type: 'click', handler: vi.fn(), eventId: 'e1' });
    removeEventIdFromStore({ element, eventId: 'e1' });
    expect(element.getAttribute('listener')).toBeNull();
  });
});

