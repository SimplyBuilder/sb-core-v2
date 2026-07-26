export interface ShadowConfigString {
  mode: 'open' | 'closed';
}

export interface ShadowConfigObject {
  mode: 'open' | 'closed';
  styles?: string;
}

export type ShadowConfig = ShadowConfigString | ShadowConfigObject | string;

export interface EventStruct {
  type: string;
  action: string;
  node?: string;
}

export interface ElementStruct {
  element: string;
  type?: string;
  attr?: Record<string, string>;
  attrNS?: Record<string, string>;
  dataset?: Record<string, string>;
  text?: string;
  html?: string;
  shadow?: ShadowConfig;
  event?: EventStruct;
  children?: ElementStruct[];
}

export interface CreateHTMLElementOptions {
  parent?: HTMLElement | ShadowRoot;
  element: {
    type: string;
    attr?: Array<{ name: string; value: string }>;
    dataset?: Array<{ name: string; value: string }>;
  };
  shadow?: ShadowConfig;
}

export interface CreateSVGElementOptions {
  parent?: HTMLElement | SVGElement;
  element: {
    type: string;
    attr?: Array<{ name: string; value: string }>;
    attrNS?: Array<{ name: string; value: string }>;
    dataset?: Array<{ name: string; value: string }>;
  };
}
