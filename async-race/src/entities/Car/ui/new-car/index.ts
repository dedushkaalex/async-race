import { BaseComponent } from '@shared/base-component/BaseComponent';

import '../styles.scss';

export class NewCar extends BaseComponent {
  public inputCarName: BaseComponent<'input'>;
  public colorPicker: BaseComponent<'input'>;
  public createCarBtn: BaseComponent<'button'>;
  constructor() {
    super({
      tagName: 'div',
      className: ['input-group', 'mb-3']
    });

    this.inputCarName = new BaseComponent<'input'>({
      tagName: 'input',
      className: ['input-group', 'mb-3'],
      attrs: {
        type: 'text',
        placeholder: 'Car name'
      }
    });

    this.colorPicker = new BaseComponent({
      tagName: 'input',
      className: ['mx-1', 'h-auto'],
      attrs: {
        type: 'color',
        id: 'favcolor',
        value: '#ff0000'
      }
    });

    this.createCarBtn = new BaseComponent({
      tagName: 'button',
      className: ['btn', 'btn-dark'],
      attrs: {
        type: 'color',
        id: 'favcolor',
        value: '#ff0000'
      },
      textContent: 'Create'
    });

    const [inputCarName, colorPicker, createCarBtn] = [
      this.inputCarName.node,
      this.colorPicker.node,
      this.createCarBtn.node
    ];

    this.node.append(inputCarName, colorPicker, createCarBtn);
  }
}
