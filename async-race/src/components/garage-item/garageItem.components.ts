/* eslint-disable prettier/prettier */
import { BaseComponent } from '@core/base-component/BaseComponent';

import styles from './styles.module.scss';

import { Button } from 'ui/button/button.component';

export class GarageItem extends BaseComponent {
  public selectCarBtn: Button<'button'>;
  public removeCarBtn: Button<'button'>;
  public startEngineBtn: Button<'button'>;
  public stopEngineBtn: Button<'button'>;
  public carName: BaseComponent<'span'>;
  public track: BaseComponent<'input'>;
  public car: BaseComponent<'object'>;

  constructor() {
    super({
      tagName: 'div',
      className: [styles.car]
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
      textContent: 'Tesla'
    });
    this.selectCarBtn = new Button({
      tagName: 'button',
      className: [styles.button, styles.yellow],
      textContent: 'select'
    });

    this.removeCarBtn = new Button({
      tagName: 'button',
      className: [styles.button, styles.blue],
      textContent: 'remove'
    });

    this.startEngineBtn = new Button({
      tagName: 'button',
      className: [styles.button, styles.start],
      textContent: 'start'
    });

    this.stopEngineBtn = new Button({
      tagName: 'button',
      className: [styles.button, styles.stop],
      textContent: 'stop'
    });

    this.car = new BaseComponent({
      tagName: 'object',
      className: [styles.carSvg],
      attrs: {
        data: '/game/Tesla.svg',
        type: "image/svg+xml"
      }
    });
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
      children: [this.track, this.car]
    });

    this.append(carNavigator, carEngine, trackWrapper);
  }
}
