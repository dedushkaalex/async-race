/* eslint-disable no-return-assign */
import { CarResponse } from '@api/interface';
import { BaseComponent } from '@core/base-component';
import { generateOneHundredCars } from 'utils/generateOneHundredCars';

import { Button } from '@components/button/button';
import { Input } from '@components/input/input';

import './carCreator.scss';
import { generateCars } from './model/handlers';

export class CarCreator extends BaseComponent<'section'> {
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
}
