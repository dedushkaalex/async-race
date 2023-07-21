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

  private btnSortByWinner: BaseComponent<'span'>;
  private btnSortByTime: BaseComponent<'span'>;

  private sortBy: string = 'ASC';
  private sortParam: string = 'id';

  constructor() {
    super({
      tagName: 'table',
      classList: ['table']
    });
    this.winners = [];
    this.btnSortByWinner = new BaseComponent({
      tagName: 'span',
      classList: ['sort']
    });
    this.btnSortByTime = new BaseComponent({
      tagName: 'span',
      classList: ['sort']
    });
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
          classList: ['th', 'th-wins'],
          children: [
            new BaseComponent<'span'>({
              tagName: 'span',
              textContent: 'Wins'
            }),
            this.btnSortByWinner
          ]
        }),
        new BaseComponent<'th'>({
          tagName: 'th',
          classList: ['th', 'th-best-time'],
          children: [
            new BaseComponent<'span'>({
              tagName: 'span',
              textContent: 'Best time (s)'
            }),
            this.btnSortByTime
          ]
        })
      ]
    });

    AppStore.subscribe('countWinners', this.update.bind(this));
    // fadeOut(this.node, FADE_OUT);
    // fadeIn(this.node, FADE_IN, () => );
    this.render();
    this.setSortListener();
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
    const winnerResponse = await RaceApi.getWinners(
      page,
      LIMIT_WINNERS,
      this.sortParam,
      this.sortBy
    );
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

  public setSortListener(): void {
    let reverse = false;
    // private sortBy: string = 'ASC';
    // private sortParam: string = 'id';
    this.btnSortByTime.node.addEventListener('click', async () => {
      reverse = !reverse;
      this.btnSortByTime.toggleClass('reverse');
      this.btnSortByWinner.removeClass('reverse');
      this.sortParam = 'time';
      if (reverse) {
        this.sortBy = 'DESC';
      } else {
        this.sortBy = 'ASC';
      }
      AppStore.runUpdaters('countWinners');
    });

    this.btnSortByWinner.node.addEventListener('click', async () => {
      reverse = !reverse;
      this.btnSortByWinner.toggleClass('reverse');
      this.btnSortByTime.removeClass('reverse');
      this.sortParam = 'wins';
      if (reverse) {
        this.sortBy = 'DESC';
      } else {
        this.sortBy = 'ASC';
      }
      AppStore.runUpdaters('countWinners');
    });
  }
}
