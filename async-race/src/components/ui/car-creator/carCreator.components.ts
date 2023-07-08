import { BaseComponent } from '@core/base-component/BaseComponent';

import {
  colorCreatePickerCarInput,
  colorUpdatePickerCarInput,
  createCarBtn,
  createCarInput,
  generateBtn,
  rageAllBtn,
  resetBtn,
  updateCarBtn,
  updateCarInput
} from './model/car.components';
import styles from './style.module.scss';

export class CarCreator extends BaseComponent<'section'> {
  public createCarInput = createCarInput;
  public updateCarInput = updateCarBtn;
  public colorCreatePickerCarInput = colorCreatePickerCarInput;
  public colorUpdatePickerCarInput = colorUpdatePickerCarInput;
  public createCarBtn = createCarBtn;
  public updateCarBtn = updateCarInput;
  public generateBtn = generateBtn;
  public rageAllBtn = rageAllBtn;
  public resetBtn = resetBtn;
  constructor() {
    super({
      tagName: 'section',
      className: [styles.section]
    });

    this.render();
  }

  public render(): void {
    this.append(
      this.createComponent([
        this.createCarInput,
        this.colorCreatePickerCarInput,
        this.createCarBtn
      ]),

      this.createComponent([
        this.updateCarBtn,
        this.colorUpdatePickerCarInput,
        this.updateCarInput
      ]),

      this.createComponent([this.rageAllBtn, this.generateBtn, this.resetBtn])
    );
  }
  private createComponent(
    elements: BaseComponent<keyof HTMLElementTagNameMap>[]
  ): BaseComponent<keyof HTMLElementTagNameMap> {
    const wrapper = new BaseComponent({
      tagName: 'div',
      className: [styles.row],
      children: [...elements]
    });

    return wrapper;
  }
}
