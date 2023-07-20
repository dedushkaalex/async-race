/* eslint-disable max-lines-per-function */
import { RaceApi } from '@api/api';
import { FADE_IN, FADE_OUT, LIMIT_WINNERS } from '@constants/index';
import { AppStore } from '@core/Store/Store';
import { BaseComponent } from '@core/base-component';
import { createSVG } from 'utils/createSvg';
import { fadeIn, fadeOut } from 'utils/fadeAnimations';

import './winners.scss';

export class WinnersTable extends BaseComponent<'table'> {
  public tableHead: BaseComponent<'tr'>;
  private winners: BaseComponent<'tr'>[];

  constructor() {
    super({
      tagName: 'table',
      classList: ['table']
    });
    this.winners = [];
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

    AppStore.subscribe('countWinners', this.update.bind(this));
    fadeOut(this.node, FADE_OUT);
    fadeIn(this.node, FADE_IN, () => this.render());
  }

  public update(): void {
    fadeOut(this.node, FADE_OUT);
    fadeIn(this.node, FADE_IN, () => this.render());
    console.log('Состояние таблицы лидеров обновлено:', AppStore.state);
  }
  public render(): void {
    this.append(this.tableHead);
    this.generateWinners(AppStore.state.countWinners);
  }

  public async generateWinners(page: number): Promise<void> {
    const winners: BaseComponent<'tr'>[] = [];
    const winnerResponse = await RaceApi.getWinners(page, LIMIT_WINNERS);
    const items = winnerResponse.count;
    AppStore.state.totalWinners = Number(items);

    winnerResponse.items.forEach((winner) => {
      console.log(winner);

      const carItem = this.createWinnerElement(
        winner.id,
        winner.time,
        winner.wins,
        winner.carName,
        winner.color
      );
      winners.push(carItem);
    });
    this.winners = this.winners.concat(winners);
    this.append(...winners);
  }

  public createWinnerElement(
    id: number,
    time: number,
    wins: number,
    carName: string,
    color: string
  ): BaseComponent<'tr'> {
    console.log(carName, color);

    const svg = createSVG(color || '#e6e6fa');
    const svgWrapper = new BaseComponent({
      tagName: 'td',
      classList: ['td', 'svg-wrapper']
    });
    svgWrapper.node.append(svg);
    const winnerItemElement = new BaseComponent({
      tagName: 'tr',
      classList: ['tr'],
      children: [
        new BaseComponent({
          tagName: 'td',
          classList: ['td'],
          textContent: String(id)
        }),
        svgWrapper,
        new BaseComponent({
          tagName: 'td',
          classList: ['td'],
          textContent: carName || 'Tesla'
        }),
        new BaseComponent({
          tagName: 'td',
          classList: ['td'],
          textContent: String(wins)
        }),
        new BaseComponent({
          tagName: 'td',
          classList: ['td'],
          textContent: String(time)
        })
      ]
    });
    return winnerItemElement;
  }
}
