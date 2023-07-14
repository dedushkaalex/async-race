import { BaseComponent } from '@core/base-component/BaseComponent';

export class NotFoundScreen {
  public render(): BaseComponent<'h1'> {
    return new BaseComponent({
      tagName: 'h1',
      textContent: '404 NOT FOUND'
    });
  }
}
