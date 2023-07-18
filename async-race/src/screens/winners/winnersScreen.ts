// import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component/BaseComponent';

import { WinnersTable } from '@components/winners-table/winnersTable';

export class WinnersScreen extends BaseComponent {
  // public store = Store.getInstance();
  public title: BaseComponent<'h1'>;
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });
    // this.store.addObserver(this);
    this.title = new BaseComponent<'h1'>({
      tagName: 'h1',
      classList: ['title'],
      // textContent: `Winners [${this.store.state.totalWinners}]`
    });
  }
  public render(): BaseComponent {
    this.append(this.title);
    return this;
  }
  public update(): void {
    // this.title.addTextContent(`Winners [${this.store.state.totalWinners}]`);
  }
}
