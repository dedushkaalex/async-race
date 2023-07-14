/* eslint-disable import/no-cycle */
import { ComponentAttributes } from './types';
import { createDomElement, setAttributes } from './utils';

export interface IProps<T extends keyof HTMLElementTagNameMap> {
  tagName?: T;
  className?: string[];
  textContent?: string;
  attrs?: null | ComponentAttributes;
  children?: BaseComponent<keyof HTMLElementTagNameMap>[];
}

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> {
  public readonly node: HTMLElementTagNameMap[T];
  constructor({
    tagName,
    className = [],
    attrs = null,
    textContent = '',
    children = []
  }: IProps<T>) {
    this.node = createDomElement(
      tagName ?? 'div',
      attrs
    ) as HTMLElementTagNameMap[T];

    this.node.classList.add(...className);
    this.node.textContent = textContent;

    if (attrs) {
      setAttributes(this.node, attrs as ComponentAttributes);
    }
    if (children.length) {
      this.append(...children);
    }
  }

  public static clear<T extends keyof HTMLElementTagNameMap>(
    el: BaseComponent<T>
  ): void {
    el.node.textContent = '';
  }

  public append<U extends keyof HTMLElementTagNameMap>(
    ...children: Array<BaseComponent<U>>
  ): void {
    this.node.append(...children.map((component) => component.node));
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroy(): void {
    this.node.remove();
  }
}
