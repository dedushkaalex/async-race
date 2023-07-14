import { BaseComponent } from '@core/base-component/BaseComponent';

export class WinnersScreen {
  public render(): BaseComponent<'p'> {
    return new BaseComponent({
      tagName: 'p',
      textContent: 'Winners'
    });
  }
}
