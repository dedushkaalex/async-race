/* eslint-disable no-return-assign */
import { RaceApi } from '@api/api';
import { CarResponse } from '@api/interface';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';

import { Button } from '@components/button/button';
import { Input } from '@components/input/input';

import './carCreator.scss';
import { generateCars } from './model/handlers';

export class CarCreator extends BaseComponent<'section'> {
  public store = Store.getInstance();
  public carNameInput: Input;
  public updateCarInput: Input;
  public colorCreatePickerCarInput: Input;
  public colorUpdatePickerCarInput: Input;
  public createCarBtn: Button;
  public updateCarBtn: Button;
  public generateBtn: Button;
  public rageAllBtn: Button;
  public resetBtn: Button;
  constructor() {
    super({
      tagName: 'section',
      classList: ['section']
    });

    this.carNameInput = new Input('text', [], 'Car name');
    this.updateCarInput = new Input('text', [], 'Car name for update');
    this.colorCreatePickerCarInput = new Input('color');
    this.colorUpdatePickerCarInput = new Input('color');
    this.createCarBtn = new Button('Create', ['green']);
    this.updateCarBtn = new Button('Update', ['purple']);
    this.generateBtn = new Button('Generate', ['blue'], () =>
      this.generateBtnHandler()
    );
    this.rageAllBtn = new Button('Rage', ['red']);
    this.resetBtn = new Button('Reset', ['green']);
    this.render();

    this.changeActiveBtn(this.updateCarBtn, true);
    this.changeActiveBtn(this.updateCarInput, true);

    this.createCarHandler();

    document.addEventListener('selectCar', (e) => {
      const target = e as CustomEvent;
      const { id, carName } = target.detail;
      this.changeActiveBtn(this.updateCarInput, false);
      this.changeActiveBtn(this.updateCarBtn, false);
      this.updateCarInput.setValue(carName);
      this.updateCarHandler(id);
    });
  }

  public render(): void {
    this.append(
      this.createComponent([
        this.carNameInput,
        this.colorCreatePickerCarInput,
        this.createCarBtn
      ]),

      this.createComponent([
        this.updateCarInput,
        this.colorUpdatePickerCarInput,
        this.updateCarBtn
      ]),

      this.createComponent([this.rageAllBtn, this.generateBtn, this.resetBtn])
    );
  }

  private createComponent(
    elements: BaseComponent<keyof HTMLElementTagNameMap>[]
  ): BaseComponent<keyof HTMLElementTagNameMap> {
    const wrapper = new BaseComponent({
      tagName: 'div',
      classList: ['row'],
      children: [...elements]
    });

    return wrapper;
  }

  private async generateBtnHandler(): Promise<CarResponse> {
    this.generateBtn.node.disabled = true;
    this.generateBtn.node.style.background = 'gray';
    return generateCars().finally((): void => {
      setTimeout(() => {
        this.generateBtn.node.disabled = false;
        this.generateBtn.node.style.background = '';
      }, 3000);
    });
  }

  public createCarHandler(): void {
    this.createCarBtn.addListener('click', async () => {
      const name = this.carNameInput.getValue().trim();
      const color = this.colorCreatePickerCarInput.getValue();
      if (name.length) {
        await RaceApi.createCar({ name, color });
        document.dispatchEvent(new CustomEvent('createCar'));
        this.carNameInput.setValue('');
      }
    });
  }

  public updateCarHandler(id: number): void {
    console.log(id);

    this.updateCarBtn.addListener('click', async () => {
      await RaceApi.updateCar(id, {
        name: this.updateCarInput.getValue(),
        color: this.colorUpdatePickerCarInput.getValue()
      }).finally((): void => {
        setTimeout(() => {
          this.changeActiveBtn(this.updateCarBtn, true);
          this.changeActiveBtn(this.updateCarInput, true);
        }, 2000);
      });

      this.updateCarInput.setValue('');
      this.store.updateComponent();
    });
  }

  private changeActiveBtn(
    element: Button | Input,
    isActive: boolean = false
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (isActive) {
      element.setAttribute('disabled', String(isActive));
      element.addClass('disabled');
    } else {
      element.removeAttribute('disabled');
      element.removeClass('disabled');
    }
  }
}
