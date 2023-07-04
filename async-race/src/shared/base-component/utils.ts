/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ComponentAttributes } from './types';

export function createDomElement<
  T extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
>(tag: T, attrs: ComponentAttributes | null) {
  const options = attrs?.is ? { is: attrs.is as string } : undefined;
  if (attrs?.xmlns)
    return document.createElementNS(
      attrs.xmlns as string,
      tag,
      options
    ) as T extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[T] : never;

  return document.createElement(
    tag,
    options
  ) as T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : never;
}

// const createSvg = createDomElement('svg', {
//   xmlns: 'www.all.com'
// });
// const created = createDomElement('div', {
//   xmlns: 'www.all.com'
// });

export function setAttributes(
  element: HTMLElement,
  attrs: ComponentAttributes
): void {
  for (const name of Object.keys(attrs)) {
    const value = attrs[name];
    console.log(value);

    if (name.startsWith('on')) {
      const finalName = name.replace(/Capture$/, '');
      const useCapture = name !== finalName;
      const eventName = finalName.toLowerCase().substring(2);
      element.addEventListener(
        eventName,
        value as EventListenerOrEventListenerObject,
        useCapture
      );
    } else if (name === 'style' && typeof value !== 'string') {
      // Special handler for style with a value of type CSSStyleDeclaration
      transferKnownProperties(value, element.style);
    } else if (value === true) element.setAttribute(name, name);
    else if (value || value === 0) element.setAttribute(name, value.toString());
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transferKnownProperties(source: any, target: any): void {
  for (const key of Object.keys(source)) {
    if (key in target) target[key] = source[key];
  }
}
