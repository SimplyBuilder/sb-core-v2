import { describe, it, expect, beforeEach } from 'vitest';
import { createHTMLElement, createSVGElement } from '../src/creator.js';
import { clearStore, getElementFromStore } from '../src/store.js';

beforeEach(() => {
  document.body.innerHTML = '';
  clearStore();
});

describe('createHTMLElement', () => {
  it('creates a div and appends to body', () => {
    const el = createHTMLElement({
      element: { type: 'div' },
    }) as HTMLElement;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.tagName).toBe('DIV');
    expect(document.body.contains(el)).toBe(true);
  });

  it('creates element with attributes', () => {
    const el = createHTMLElement({
      element: { type: 'button', attr: [{ name: 'id', value: 'btn' }, { name: 'class', value: 'primary' }] },
    }) as HTMLElement;
    expect(el.getAttribute('id')).toBe('btn');
    expect(el.getAttribute('class')).toBe('primary');
  });

  it('creates element with dataset and registers in store when state is set', () => {
    const el = createHTMLElement({
      element: { type: 'div', dataset: [{ name: 'state', value: 'myId' }] },
    }) as HTMLElement;
    expect(el.dataset.state).toBe('myId');
    expect(getElementFromStore('myId')).toBe(el);
  });

  it('creates element with dataset and does not register without state key', () => {
    const el = createHTMLElement({
      element: { type: 'div', dataset: [{ name: 'role', value: 'main' }] },
    }) as HTMLElement;
    expect(el.dataset.role).toBe('main');
  });

  it('creates element and appends to parent', () => {
    const parent = document.createElement('section');
    document.body.appendChild(parent);
    const el = createHTMLElement({
      parent,
      element: { type: 'span' },
    }) as HTMLElement;
    expect(parent.contains(el)).toBe(true);
  });

  it('appends to parent object', () => {
    const el = createHTMLElement({
      parent: document.body as any,
      element: { type: 'p' },
    }) as HTMLElement;
    expect(document.body.contains(el)).toBe(true);
  });
});

describe('createSVGElement', () => {
  it('creates an SVG element', () => {
    const el = createSVGElement({
      parent: document.body,
      element: { type: 'circle' },
    }) as SVGElement;
    expect(el).toBeInstanceOf(SVGElement);
    expect(el.tagName).toBe('circle');
  });

  it('creates SVG element with attributes', () => {
    const el = createSVGElement({
      parent: document.body,
      element: {
        type: 'rect',
        attr: [{ name: 'width', value: '100' }, { name: 'height', value: '50' }],
      },
    }) as SVGElement;
    expect(el.getAttribute('width')).toBe('100');
    expect(el.getAttribute('height')).toBe('50');
  });

  it('creates SVG element with namespaced attributes', () => {
    const el = createSVGElement({
      parent: document.body,
      element: {
        type: 'image',
        attrNS: [{ name: 'href', value: 'test.svg' }],
      },
    }) as SVGElement;
    expect(el.getAttributeNS(null, 'href')).toBe('test.svg');
  });
});
