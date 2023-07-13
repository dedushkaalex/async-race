import { BaseComponent, IProps } from '@core/base-component/BaseComponent';

export class Input extends BaseComponent<'input'> {
  constructor({ className, attrs }: IProps<'input'>, callback?: () => void) {
    super({
      tagName: 'input',
      className,
      attrs: {
        ...attrs,
        onclick: callback
      }
    });
  }
}
