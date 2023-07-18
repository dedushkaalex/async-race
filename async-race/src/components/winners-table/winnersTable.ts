import { RaceApi } from '@api/api';
import { Winner, Winners } from '@api/interface';
import { LIMIT_WINNERS } from '@constants/index';
// import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { createSVG } from 'utils/createSvg';

import './winners.scss';

export class WinnersTable extends BaseComponent<'table'> {
  public tableHead: BaseComponent<'tr'>;
  // public store = Store.getInstance();
  constructor() {
    super({
      tagName: 'table',
      classList: ['table']
    });
    // this.store.addObserver(this);

    this.tableHead = new BaseComponent({
      tagName: 'tr',
      children: [
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th'],
          textContent: 'Number'
        }),
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th'],
          textContent: 'Car'
        }),
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th'],
          textContent: 'Name'
        }),
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th'],
          textContent: 'Wins'
        }),
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th'],
          textContent: 'Best time (s) ▲'
        })
      ]
    });
    this.render();
  }

  public update(): void {}
  public render(): void {
    this.append(this.tableHead);
  }

  public async generateWinners(page: number): Promise<void> {
    const winners: Winners[] = [];
    const winnerResponse = await RaceApi.getWinners(page, LIMIT_WINNERS);
    const items = winnerResponse.count;
    // this.store.state.totalCar = Number(items);
    // console.log(this.store.state.totalCar);

    winnerResponse.items.forEach((winner) => {
      const carItem = this.createWinnerElement(
        winner.id,
        winner.time,
        winner.wins
      );
      // winners.push(carItem);
    });
    // this.cars = this.cars.concat(cars);
    // this.append(...cars);
  }

  public createWinnerElement(
    id: number,
    time: number,
    wins: number
  ): BaseComponent<'tr'> {
    const svg = createSVG('red');
    const svgWrapper = new BaseComponent({
      tagName: 'td'
    });
    svgWrapper.node.append(svg);
    const winnerItemElement = new BaseComponent({
      tagName: 'tr',
      classList: ['tr'],
      children: [
        new BaseComponent({
          tagName: 'td',
          textContent: String(id)
        }),
        svgWrapper,
        new BaseComponent({
          tagName: 'td',
          textContent: 'BMW'
        }),
        new BaseComponent({
          tagName: 'td',
          textContent: String(wins)
        }),
        new BaseComponent({
          tagName: 'td',
          textContent: String(time)
        })
      ]
    });
    return winnerItemElement;
  }
}
