import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CoreModule } from '../src/main.js';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('Core integration', () => {
  it('exports eventRegister and eventUnregister on CoreModule', () => {
    expect(typeof CoreModule.eventRegister).toBe('function');
    expect(typeof CoreModule.eventUnregister).toBe('function');
  });

  it('createFromStruct attaches events via domModuleExtends', () => {
    const handler = vi.fn();
    CoreModule.eventRegister('coreClick', handler);

    const el = CoreModule.createFromStruct({
      struct: { element: 'button', event: { type: 'click', action: 'coreClick' } },
    }) as HTMLElement;

    expect(el.getAttribute('listener')).toBe('true');
    el.dispatchEvent(new Event('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('removeElement cleans up listeners recursively', () => {
    const handler = vi.fn();
    CoreModule.eventRegister('coreBtn', handler);

    const parent = CoreModule.createFromStruct({
      struct: {
        element: 'div',
        dataset: { state: 'parent' },
        children: [
          { element: 'button', event: { type: 'click', action: 'coreBtn' }, text: 'Click' },
        ],
      },
    }) as HTMLElement;

    const btn = parent.querySelector('button')!;
    expect(btn.getAttribute('listener')).toBe('true');

    CoreModule.removeElement(parent);

    btn.dispatchEvent(new Event('click'));
    expect(handler).not.toHaveBeenCalled();
    expect(document.body.contains(parent)).toBe(false);
  });

  it('getElementFromStore retrieves stored elements', () => {
    const el = CoreModule.createFromStruct({
      struct: { element: 'div', dataset: { state: 'stored' } },
    }) as HTMLElement;

    expect(CoreModule.getElementFromStore('stored')).toBe(el);
  });
});
