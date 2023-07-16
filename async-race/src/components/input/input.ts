import { BaseComponent } from '@core/base-component';

import './input.scss';

export class Input extends BaseComponent<'input'> {
  protected input: HTMLInputElement;
  constructor(
    type: string,
    classList: string[] = [],
    placeholder?: string,
    value?: number | string
  ) {
    super({
      tagName: 'input',
      classList: ['input', ...classList]
    });

    this.input = this.node;
    this.setAttributes(type, placeholder ?? '', value ?? '');
  }

  public getValue(): string {
    return this.input.value;
  }

  public setValue(value: string): void {
    this.input.value = value;
  }

  private setAttributes(
    type: string,
    placeholder: string,
    value: number | string
  ): void {
    this.setAttribute('type', type);
    this.setAttribute('placeholder', placeholder);
    if (value) {
      this.setAttribute('value', value.toString());
    }
  }
}
