import { BaseComponent } from '@shared/base-component/BaseComponent';

export class WinnersPage extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      className: ['container', 'pt-5']
    });
    this.node.insertAdjacentHTML(
      'beforeend',
      `
    <h1>Winners</h1>
    `
    );
  }
}
