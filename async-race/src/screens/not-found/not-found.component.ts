import { BaseComponent } from '@core/base-component/BaseComponent';

export class NotFound {
  public render(): BaseComponent<'h1'> {
    return new BaseComponent({
      tagName: 'h1',
      textContent: '404 NOT FOUND'
    });
  }
}
