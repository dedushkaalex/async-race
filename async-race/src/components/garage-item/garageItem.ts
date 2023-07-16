import { RaceApi } from '@api/api';
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
    this.setAttribute('id', `${this.id}`);

    this.track = new Input('range', ['track']);
    this.track.removeClass('input');
    this.track.setAttribute('min', '0');
    this.track.setAttribute('max', '100');
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
    this.handleStartEngine();
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

  public handleStartEngine(): void {
    this.startEngineBtn.addListener('click', async () => {
      const { distance, velocity } = await RaceApi.startEngine(this.id);
      // const status = await RaceApi.startDrive(this.id);
      const duration = distance / velocity;
      this.track.node.max = String(distance);

      // this.track.node.addEventListener('input', );
      this.animationSpeed(distance, duration);
    });
  }

  public animationSpeed(distance: number, duration: number): void {
    const maxValue = duration;
    let startTime: number | null = null;
    let startValue = 0;
    const animateThumb = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = elapsedTime / duration;
      const value = startValue + (progress * distance * maxValue) / duration;
      this.track.node.value = String(value);
      this.animationImage();

      if (progress < 1) {
        requestAnimationFrame(animateThumb);
      } else {
        startTime = null;
      }
    };

    const startAnimation = (): void => {
      startTime = null;
      startValue = Number(this.track.node.value);
      requestAnimationFrame(animateThumb);
    };
    const handleResize = (): void => {
      this.animationImage();
    };

    window.addEventListener('resize', handleResize);
    startAnimation();
  }

  public animationImage(): void {
    const valueThumb = Number(this.track.node.value);
    console.log(valueThumb);

    const svgRect = this.car.getBoundingClientRect().width;
    const imagePosition =
      (valueThumb / Number(this.track.node.max)) *
      (this.track.node.offsetWidth - svgRect);

    this.car.style.transform = `translateX(${imagePosition}px)`;
  }
}
