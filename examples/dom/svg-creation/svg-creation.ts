import { createSVGElement } from '@simplybuilder/core-dom';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '200');
svg.setAttribute('height', '200');

createSVGElement({
  parent: svg,
  element: {
    type: 'circle',
    attr: { cx: '100', cy: '100', r: '80', fill: 'steelblue' },
  },
});

createSVGElement({
  parent: svg,
  element: {
    type: 'rect',
    attr: { x: '50', y: '50', width: '100', height: '100', fill: 'orange', opacity: '0.7' },
  },
});

document.body.appendChild(svg);
