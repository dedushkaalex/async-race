import { BaseComponent } from '@core/base-component/BaseComponent';

export class WinnersScreen extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });
  }
  public render(): BaseComponent<'p'> {
    return this;
  }
}
