import { BaseComponent } from '@core/base-component/BaseComponent';

export class Winners {
  public render(): BaseComponent<'p'> {
    return new BaseComponent({
      tagName: 'p',
      textContent: 'Winners'
    });
  }
}
