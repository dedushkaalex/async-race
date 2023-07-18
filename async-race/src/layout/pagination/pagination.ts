import { Page } from '@api/types';
import { LIMIT_GARAGE, LIMIT_WINNERS } from '@constants/index';
import { AppStore } from '@core/Store/Store';
// import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { Router } from 'router/router';
import { Actions } from 'types';

import { Button } from '@components/button/button';

import './pagination.scss';

export class Pagination extends BaseComponent {
  public btnPrev: Button;
  public btnNext: Button;
  public pageCounter: BaseComponent<'span'>;

  constructor() {
    super({
      tagName: 'div',
      classList: ['pagination']
    });

    this.btnPrev = new Button('PREV');
    this.btnNext = new Button('NEXT');
    this.pageCounter = new BaseComponent({
      tagName: 'span',
      classList: ['page-counter']
    });

    AppStore.subscribe('count', this.update.bind(this));
    AppStore.subscribe('totalCar', this.update.bind(this));
    this.initButtons();
    this.btnHandlers();
  }
  public update(): void {
    const lastPage = this.getLastPage(AppStore.state.totalCar);
    this.pageCounter.addTextContent(`${this.getCurrPage()}/${lastPage}`);
    console.log('Слежу за пагинацией', AppStore.state);

    this.highlightBtnChecker();
  }
  private initButtons(): void {
    this.append(this.btnPrev, this.pageCounter, this.btnNext);
  }

  public setPageCounter(action: Actions): void {
    const { state } = AppStore;
    const lastPageGarage = this.getLastPage(Number(state.totalCar));
    if (action === '-') {
      if (state.count <= 1) {
        this.btnPrev.node.style.background = 'gray';
        this.btnPrev.node.disabled = true;
        return;
      }
      (state.count as number) -= 1;
    } else if (action === '+') {
      console.log('here');
      if ((state.count as number) >= lastPageGarage) {
        return;
      }
      (state.count as number) += 1;
    }
  }

  public highlightBtnChecker(): void {
    const { state } = AppStore;
    const lastPageGarage = this.getLastPage(state.totalCar);
    if (state.count <= 1) {
      this.btnPrev.node.style.background = 'gray';
      this.btnPrev.node.disabled = true;
    } else {
      this.btnPrev.node.style.background = '';
      this.btnPrev.node.disabled = false;
    }

    if (state.count === lastPageGarage) {
      this.btnNext.node.style.background = 'gray';
      this.btnNext.node.disabled = true;
    } else {
      this.btnNext.node.style.background = '';
      this.btnNext.node.disabled = false;
    }
  }

  public getCurrPage(): number {
    return AppStore.state.count;
  }

  public getLastPage(value: number): number {
    return Math.ceil(Number(value) / LIMIT_GARAGE);
  }

  public btnHandlers(): void {
    this.btnNext.addListener('click', (e) => {
      e.preventDefault();
      this.setPageCounter('+');
    });

    this.btnPrev.addListener('click', (e) => {
      e.preventDefault();
      this.setPageCounter('-');
    });
  }
}
