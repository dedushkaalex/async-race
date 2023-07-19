import { LIMIT_GARAGE, LIMIT_WINNERS } from '@constants/index';
import { AppStore } from '@core/Store/Store';
// import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
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

    AppStore.subscribe('countWinners', this.update.bind(this));
    AppStore.subscribe('totalWinners', this.update.bind(this));

    AppStore.subscribe('page', this.update.bind(this));

    this.initButtons();
    this.btnHandlers();
  }
  public update(): void {
    const { page } = AppStore.state;
    let lastPage;
    if (page === '/') {
      lastPage = this.getLastPage(AppStore.state.totalCar);
      this.pageCounter.addTextContent(`${this.getCurrPage()}/${lastPage}`);
      console.log('Слежу за пагинацией Garage', AppStore.state);
    } else {
      lastPage = this.getLastPage(AppStore.state.totalWinners);
      this.pageCounter.addTextContent(`${this.getCurrPage()}/${lastPage}`);
      console.log('Слежу за пагинацией Winners', AppStore.state);
    }

    this.highlightBtnChecker();
  }

  private initButtons(): void {
    this.append(this.btnPrev, this.pageCounter, this.btnNext);
  }

  public setPageCounter(action: Actions): void {
    const { state } = AppStore;
    const lastPageGarage =
      state.page === '/'
        ? this.getLastPage(state.totalCar)
        : this.getLastPage(state.totalWinners);

    if (action === '-') {
      if (state.page === '/') {
        if (state.count <= 1) {
          this.btnPrev.node.style.background = 'gray';
          this.btnPrev.node.disabled = true;
          return;
        }
        state.count -= 1;
      } else {
        if (state.countWinners <= 1) {
          this.btnPrev.node.style.background = 'gray';
          this.btnPrev.node.disabled = true;
          return;
        }
        state.countWinners -= 1;
      }
    } else if (action === '+') {
      if (state.page === '/') {
        if (state.count >= lastPageGarage) {
          return;
        }
        state.count += 1;
      } else {
        if (state.countWinners >= lastPageGarage) {
          return;
        }
        state.countWinners += 1;
      }
    }
  }

  public highlightBtnChecker(): void {
    const { state } = AppStore;
    const lastPageGarage =
      state.page === '/'
        ? this.getLastPage(state.totalCar)
        : this.getLastPage(state.totalWinners);
    if (state.page === '/') {
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
    } else {
      if (state.countWinners <= 1) {
        this.btnPrev.node.style.background = 'gray';
        this.btnPrev.node.disabled = true;
      } else {
        this.btnPrev.node.style.background = '';
        this.btnPrev.node.disabled = false;
      }

      if (state.countWinners === lastPageGarage) {
        this.btnNext.node.style.background = 'gray';
        this.btnNext.node.disabled = true;
      } else {
        this.btnNext.node.style.background = '';
        this.btnNext.node.disabled = false;
      }
    }
  }

  public getCurrPage(): number {
    const { page, count, countWinners } = AppStore.state;
    return page === '/' ? count : countWinners;
  }

  public getLastPage(value: number): number {
    const { page } = AppStore.state;
    return page === '/'
      ? Math.ceil(Number(value) / LIMIT_GARAGE)
      : Math.ceil(Number(value) / LIMIT_WINNERS);
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
