// import { Store } from '@core/Store/store';
import { AppStore } from '@core/Store/Store';
import { BaseComponent } from '@core/base-component/BaseComponent';

import { WinnersTable } from '@components/winners-table/winnersTable';

export class WinnersScreen extends BaseComponent {
  public title: BaseComponent<'h1'>;
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });
    this.title = new BaseComponent<'h1'>({
      tagName: 'h1',
      classList: ['title'],
      textContent: `Winners [${AppStore.state.totalWinners}]`
    });

    AppStore.subscribe('totalWinners', this.update.bind(this));
  }
  public render(): BaseComponent {
    this.append(this.title, new WinnersTable());
    return this;
  }
  public update(): void {
    this.title.addTextContent(`Winners [${AppStore.state.totalWinners}]`);
  }
}
