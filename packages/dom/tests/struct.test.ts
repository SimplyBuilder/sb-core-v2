import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createFromStruct, removeElement } from '../src/struct.js';
import { addElementToStore, clearStore, getElementFromStore } from '../src/store.js';
import { domModuleExtends, validVersionSupport, clearExtensions } from '../src/extension.js';

beforeEach(() => {
  document.body.innerHTML = '';
  clearStore();
  clearExtensions();
});

function makeFakeEventModule() {
  const ActionRefStore = new Map<EventTarget, Array<{ type: string; handler: EventListener }>>();
  return {
    name: 'SBCoreEvent',
    version: '2.0.0',
    EventActions: {},
    addEventToStore(data: { element: EventTarget; type: string; handler: EventListener }) {
      const { element, type, handler } = data;
      if (!element || !type || !handler) return false;
      if (element instanceof Element && !element.getAttribute('listener')) {
        element.setAttribute('listener', 'true');
      }
      if (!ActionRefStore.has(element)) {
        ActionRefStore.set(element, []);
      }
      ActionRefStore.get(element)!.push({ type, handler });
      element.addEventListener(type, handler, false);
      return true;
    },
    removeAllEventsFromStore(element: EventTarget) {
      const entries = ActionRefStore.get(element);
      if (!entries || entries.length === 0) return false;
      for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        if (entry) {
          element.removeEventListener(entry.type, entry.handler, false);
        }
      }
      ActionRefStore.delete(element);
      if (element instanceof Element) {
        element.removeAttribute('listener');
      }
      return true;
    },
  };
}

describe('createFromStruct', () => {
  it('creates a simple element', () => {
    const el = createFromStruct({
      struct: { element: 'div' },
    }) as HTMLElement;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.tagName).toBe('DIV');
    expect(document.body.contains(el)).toBe(true);
  });

  it('creates element with text', () => {
    const el = createFromStruct({
      struct: { element: 'span', text: 'Hello' },
    }) as HTMLElement;
    expect(el.textContent).toBe('Hello');
  });

  it('creates element with html', () => {
    const el = createFromStruct({
      struct: { element: 'div', html: '<strong>bold</strong>' },
    }) as HTMLElement;
    expect(el.innerHTML).toBe('<strong>bold</strong>');
  });

  it('creates element with attributes', () => {
    const el = createFromStruct({
      struct: { element: 'button', attr: { id: 'btn', class: 'primary' } },
    }) as HTMLElement;
    expect(el.getAttribute('id')).toBe('btn');
    expect(el.getAttribute('class')).toBe('primary');
  });

  it('creates element with dataset', () => {
    const el = createFromStruct({
      struct: { element: 'div', dataset: { role: 'main' } },
    }) as HTMLElement;
    expect(el.dataset.role).toBe('main');
  });

  it('creates element with dataset state and stores it', () => {
    const el = createFromStruct({
      struct: { element: 'div', dataset: { state: 'myEl' } },
    }) as HTMLElement;
    expect(el.dataset.state).toBe('myEl');
    expect(getElementFromStore('myEl')).toBe(el);
  });

  it('creates children recursively', () => {
    const parent = createFromStruct({
      struct: {
        element: 'ul',
        children: [
          { element: 'li', text: 'A' },
          { element: 'li', text: 'B' },
        ],
      },
    }) as HTMLElement;
    expect(parent.children.length).toBe(2);
    expect(parent.children[0].tagName).toBe('LI');
    expect(parent.children[0].textContent).toBe('A');
  });

  it('creates SVG element', () => {
    const el = createFromStruct({
      struct: { element: 'circle', type: 'svg' },
    }) as SVGElement;
    expect(el).toBeInstanceOf(SVGElement);
  });

  it('returns false for invalid data', () => {
    expect(createFromStruct({ struct: { element: '' } })).toBe(false);
  });
});

describe('createFromStruct with event integration', () => {
  it('attaches event listener when EventModule is registered', () => {
    const handler = vi.fn();
    const fake = makeFakeEventModule();
    fake.EventActions['handleClick'] = handler;
    domModuleExtends(fake);

    const el = createFromStruct({
      struct: { element: 'button', event: { type: 'click', action: 'handleClick' } },
    }) as HTMLElement;

    expect(el.getAttribute('listener')).toBe('true');
    el.dispatchEvent(new Event('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not attach event when no EventModule registered', () => {
    const el = createFromStruct({
      struct: { element: 'button', event: { type: 'click', action: 'handleClick' } },
    }) as HTMLElement;

    expect(el.getAttribute('listener')).toBeNull();
  });

  it('does not attach event when action is not registered', () => {
    const fake = makeFakeEventModule();
    domModuleExtends(fake);

    const el = createFromStruct({
      struct: { element: 'button', event: { type: 'click', action: 'unknownAction' } },
    }) as HTMLElement;

    expect(el.getAttribute('listener')).toBeNull();
  });

  it('attaches events to children from struct', () => {
    const handler = vi.fn();
    const fake = makeFakeEventModule();
    fake.EventActions['childClick'] = handler;
    domModuleExtends(fake);

    const parent = createFromStruct({
      struct: {
        element: 'div',
        children: [
          { element: 'button', event: { type: 'click', action: 'childClick' }, text: 'Click me' },
        ],
      },
    }) as HTMLElement;

    const btn = parent.querySelector('button')!;
    expect(btn.getAttribute('listener')).toBe('true');
    btn.dispatchEvent(new Event('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('validVersionSupport rejects version below required major', () => {
    const result = validVersionSupport({ name: 'EventModule', version: '0.5.0' });
    expect(result).toBe(false);
  });

  it('validVersionSupport accepts version at or above required major', () => {
    expect(validVersionSupport({ name: 'SBCoreEvent', version: '1.0.0' })).toBe(false);
    expect(validVersionSupport({ name: 'SBCoreEvent', version: '2.0.0' })).toBe(true);
  });
});

describe('removeElement', () => {
  it('removes element from DOM', () => {
    const el = createFromStruct({ struct: { element: 'div' } }) as HTMLElement;
    expect(document.body.contains(el)).toBe(true);
    removeElement(el);
    expect(document.body.contains(el)).toBe(false);
  });

  it('removes element from store', () => {
    const el = createFromStruct({
      struct: { element: 'div', dataset: { state: 'myEl' } },
    }) as HTMLElement;
    expect(getElementFromStore('myEl')).toBe(el);
    removeElement(el);
    expect(getElementFromStore('myEl')).toBeUndefined();
  });

  it('cleans up listeners recursively', () => {
    const handler = vi.fn();
    const fake = makeFakeEventModule();
    fake.EventActions['btnClick'] = handler;
    domModuleExtends(fake);

    const parent = createFromStruct({
      struct: {
        element: 'div',
        dataset: { state: 'parent' },
        children: [
          { element: 'button', event: { type: 'click', action: 'btnClick' }, text: 'Click' },
        ],
      },
    }) as HTMLElement;

    const btn = parent.querySelector('button')!;
    expect(btn.getAttribute('listener')).toBe('true');

    removeElement(parent);

    expect(document.body.contains(parent)).toBe(false);
    btn.dispatchEvent(new Event('click'));
    expect(handler).not.toHaveBeenCalled();
  });
});
