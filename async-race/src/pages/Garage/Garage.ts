import { BaseComponent } from 'shared/base-component/BaseComponent';

export class GaragePage extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      className: ['container', 'pt-5'],
      textContent: 'Garage'
    });
  }

  public render(): HTMLDivElement {
    return this.node as HTMLDivElement;
  }
}
