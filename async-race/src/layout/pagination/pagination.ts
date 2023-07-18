import { Page } from '@api/types';
import { LIMIT_GARAGE, LIMIT_WINNERS } from '@constants/index';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { Router } from 'router/router';
import { Actions } from 'types';

import { Button } from '@components/button/button';

import './pagination.scss';

export class Pagination extends BaseComponent {
  public store = Store.getInstance();
  public btnPrev: Button;
  public btnNext: Button;
  public pageCounter: BaseComponent<'span'>;

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

    this.store.addObserver(this);

    this.initButtons(this.page);
    this.btnHandlers();
  }

  public update(): void {
    const lastPage = this.getLastPage(
      'Garage',
      Number(this.store.state.totalCar)
    );
    console.log(this.store.state);

    this.pageCounter.addTextContent(
      `${this.getCurrPage('Garage')}/${lastPage}`
    );
    this.highlightBtnChecker();
  }
  private initButtons(page: Page): void {
    this.btnPrev.setAttribute('id', `btn-prev-${page.toLowerCase()}`);
    this.btnNext.setAttribute('id', `btn-next-${page.toLowerCase()}`);
    this.pageCounter.setAttribute('id', `page-counter-${page.toLowerCase()}`);
    this.append(this.btnPrev, this.pageCounter, this.btnNext);
  }

  public setPageCounter(page: Page, action: Actions): void {
    const { state } = this.store;
    const lastPageGarage = this.getLastPage(
      'Garage',
      Number(this.store.state.totalCar)
    );
    const lastPageWinners = this.getLastPage(
      'Winners',
      Number(this.store.state.totalCar)
    );
    if (action === '-') {
      if (page === 'Garage') {
        if ((state.counterGarage as number) <= 1) {
          this.btnPrev.node.style.background = 'gray';
          this.btnPrev.node.disabled = true;
          return;
        }
        (state.counterGarage as number) -= 1;
      } else {
        if ((state.counterWinners as number) <= 1) {
          return;
        }
        (state.counterWinners as number) -= 1;
      }
    } else if (action === '+') {
      console.log('here');
      if (page === 'Garage') {
        if ((state.counterGarage as number) >= lastPageGarage) {
          return;
        }
        (state.counterGarage as number) += 1;
      } else {
        if ((state.counterWinners as number) >= lastPageWinners) {
          return;
        }
        (state.counterWinners as number) += 1;
      }
    }
  }

  public highlightBtnChecker(): void {
    const lastPageGarage = this.getLastPage(
      'Garage',
      Number(this.store.state.totalCar)
    );
    const { state } = this.store;
    if ((state.counterGarage as number) <= 1) {
      this.btnPrev.node.style.background = 'gray';
      this.btnPrev.node.disabled = true;
    } else {
      this.btnPrev.node.style.background = '';
      this.btnPrev.node.disabled = false;
    }

    if ((state.counterGarage as number) === lastPageGarage) {
      this.btnNext.node.style.background = 'gray';
      this.btnNext.node.disabled = true;
    } else {
      this.btnNext.node.style.background = '';
      this.btnNext.node.disabled = false;
    }
  }

  public getCurrPage(page: Page): number {
    const currentCounter: number =
      page === 'Garage'
        ? Number(this.store.state.counterGarage)
        : Number(this.store.state.counterWinners);
    return currentCounter;
  }

  public getLastPage(page: Page, value: number): number {
    let lastPage: number;

    if (page === 'Garage') {
      lastPage = Math.ceil(Number(value) / LIMIT_GARAGE);
    } else {
      lastPage = Math.ceil(Number(value) / LIMIT_WINNERS);
    }

    return lastPage;
  }

  public btnHandlers(): void {
    this.btnNext.addListener('click', (e) => {
      e.preventDefault();
      this.setPageCounter('Garage', '+');
      console.log(this.store.state.counterGarage);
    });

    this.btnPrev.addListener('click', (e) => {
      e.preventDefault();
      this.setPageCounter('Garage', '-');
      console.log(this.store.state.counterGarage);
    });
  }
}
