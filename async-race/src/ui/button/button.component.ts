import { BaseComponent, IProps } from '@core/base-component/BaseComponent';

// export interface IProps<T extends keyof HTMLElementTagNameMap> {
//   tagName?: T;
//   className?: string[];
//   textContent?: string;
//   attrs?: null | ComponentAttributes;
//   children?: BaseComponent<keyof HTMLElementTagNameMap>[];
// }

export class Button<
  T extends keyof HTMLElementTagNameMap
> extends BaseComponent<T> {
  constructor(
    { tagName, className, textContent }: IProps<T>,
    callback?: () => void
  ) {
    super({
      tagName,
      className,
      textContent,
      attrs: {
        onclick: callback
      }
    });
  }
}
