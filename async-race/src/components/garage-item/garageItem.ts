import { BaseComponent } from '@core/base-component';
import { createSVG } from 'utils/createSvg';

import { Button } from '@components/button/button';
import { Input } from '@components/input/input';

import './garageItem.style.scss';

export class GarageItem extends BaseComponent {
  public selectCarBtn: Button;
  public removeCarBtn: Button;
  public startEngineBtn: Button;
  public stopEngineBtn: Button;
  public carName: BaseComponent<'span'>;
  public track: Input;
  public car: SVGSVGElement;
  constructor(public color: string, public name: string, public id: number) {
    super({
      tagName: 'div',
      classList: ['car']
    });

    this.track = new Input('range', ['track']);
    this.track.removeClass('input');
    this.track.setAttribute('min', '1');
    this.track.setAttribute('max', '2');
    this.track.setAttribute('value', '0');

    this.carName = new BaseComponent({
      tagName: 'span',
      classList: ['carName'],
      textContent: this.name
    });

    this.selectCarBtn = new Button('select', ['yellow']);
    this.removeCarBtn = new Button('remove', ['blue']);
    this.startEngineBtn = new Button('start', ['start']);
    this.stopEngineBtn = new Button('stop', ['stop']);

    this.car = createSVG(color);

    this.render();
  }

  public render(): BaseComponent {
    const carNavigator = new BaseComponent({
      tagName: 'div',
      classList: ['car__navigator'],
      children: [
        new BaseComponent({
          tagName: 'div',
          classList: ['car__buttons'],
          children: [this.selectCarBtn, this.removeCarBtn]
        }),
        this.carName
      ]
    });

    const carEngine = new BaseComponent({
      tagName: 'div',
      classList: ['car__engine'],
      children: [
        new BaseComponent({
          tagName: 'div',
          classList: ['car__buttons'],
          children: [this.startEngineBtn, this.stopEngineBtn]
        })
      ]
    });

    const trackWrapper = new BaseComponent({
      tagName: 'div',
      classList: ['track__wrapper'],
      children: [this.track]
    });

    trackWrapper.node.append(this.car);
    this.append(carNavigator, carEngine, trackWrapper);

    return this;
  }
}
