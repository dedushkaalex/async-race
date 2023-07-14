/* eslint-disable max-lines-per-function */

/* eslint-disable prettier/prettier */
import { BaseComponent } from '@core/base-component/BaseComponent';
import { createSVG } from '@core/svg-creator/createSvg';

import styles from './styles.module.scss';

export class GarageItem extends BaseComponent {
  public selectCarBtn: BaseComponent<'button'>;
  public removeCarBtn: BaseComponent<'button'>;
  public startEngineBtn: BaseComponent<'button'>;
  public stopEngineBtn: BaseComponent<'button'>;
  public carName: BaseComponent<'span'>;
  public track: BaseComponent<'input'>;
  public car: SVGSVGElement;

  constructor(public name: string, public color: string, public id: number) {
    super({
      tagName: 'div',
      className: [styles.car],
      attrs: {
        id
      }
    });
    this.track = new BaseComponent({
      tagName: 'input',
      className: [styles.track],
      attrs: {
        type: 'range',
        min: 1,
        max: 100,
        value: 0
      }
    });
    this.carName = new BaseComponent({
      tagName: 'span',
      className: [styles.carName],
      textContent: this.name
    });
    this.selectCarBtn = new BaseComponent({
      tagName: 'button',
      className: [styles.button, styles.yellow],
      textContent: 'select'
    });

    this.removeCarBtn = new BaseComponent({
      tagName: 'button',
      className: [styles.button, styles.blue],
      textContent: 'remove',
      attrs: {
        onclick: (): void => {
          this.removeCarBtn.node.dispatchEvent(new CustomEvent(`remove`, {
            detail: {
              idCar: this.id
            },
            bubbles: true
          }));
        }
      }
    });

    this.startEngineBtn = new BaseComponent({
      tagName: 'button',
      className: [styles.button, styles.start],
      textContent: 'start'
    });

    this.stopEngineBtn = new BaseComponent({
      tagName: 'button',
      className: [styles.button, styles.stop],
      textContent: 'stop'
    });

    this.car = createSVG(color);
    this.render();
  }

  public render(): void {
    const carNavigator = new BaseComponent({
      tagName: 'div',
      className: [styles.car__navigator],
      children: [
        new BaseComponent({
          tagName: 'div',
          className: [styles.car__buttons],
          children: [this.selectCarBtn, this.removeCarBtn]
        }),
        this.carName
      ]
    });

    const carEngine = new BaseComponent({
      tagName: 'div',
      className: ['car__engine'],
      children: [
        new BaseComponent({
          tagName: 'div',
          className: [styles.car__buttons],
          children: [this.startEngineBtn, this.stopEngineBtn]
        })
      ]
    });

    const trackWrapper = new BaseComponent({
      tagName: 'div',
      className: [styles.track__wrapper],
      children: [this.track]
    });

    trackWrapper.node.append(this.car);

    this.append(carNavigator, carEngine, trackWrapper);
  }
}
