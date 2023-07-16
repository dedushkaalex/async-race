import { CarResponse, Winners } from '@api/interface';
import { Page } from '@api/types';
import { LIMIT_GARAGE, LIMIT_WINNERS } from '@constants/index';
import { BaseComponent } from '@core/base-component';
import { Actions } from 'types';

import { Button } from '@components/button/button';

import './pagination.scss';

export class Pagination extends BaseComponent {
  public btnPrev: Button;
  public btnNext: Button;
  public pageCounter: BaseComponent<'span'>;

  public counterWinners = 1;
  public counterGarage = 1;

  constructor(public page: Page) {
    super({
      tagName: 'div',
      classList: ['pagination']
    });
    this.setAttribute('id', `pagination-${this.page.toLowerCase()}`);

    this.btnPrev = new Button('PREV');
    this.btnNext = new Button('NEXT');
    this.pageCounter = new BaseComponent({
      tagName: 'span',
      classList: ['page-counter']
    });

    this.initButtons(this.page);
  }

  private initButtons(page: Page): void {
    this.btnPrev.setAttribute('id', `btn-prev-${page.toLowerCase()}`);
    this.btnNext.setAttribute('id', `btn-next-${page.toLowerCase()}`);
    this.pageCounter.setAttribute('id', `page-counter-${page.toLowerCase()}`);
    this.append(this.btnPrev, this.pageCounter, this.btnNext);
  }

  public setPageCounter(page: Page, action: Actions): number {
    let currentCounter: number;

    if (action === '+') {
      currentCounter =
        page === 'Garage'
          ? (this.counterGarage += 1)
          : (this.counterWinners += 1);
    } else {
      currentCounter =
        page === 'Garage'
          ? (this.counterGarage -= 1)
          : (this.counterWinners -= 1);
    }

    return currentCounter;
  }

  public getCurrPage(page: Page): number {
    const currentCounter: number =
      page === 'Garage' ? this.counterGarage : this.counterWinners;
    return currentCounter;
  }

  public getLastPage(page: Page, value: CarResponse | Winners): number {
    let lastPage: number;

    if (page === 'Garage') {
      lastPage = Math.ceil(Number(value.count) / LIMIT_GARAGE);
    } else {
      lastPage = Math.ceil(Number(value.count) / LIMIT_WINNERS);
    }

    return lastPage;
  }
}
