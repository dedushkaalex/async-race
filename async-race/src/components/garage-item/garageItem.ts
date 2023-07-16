import { RaceApi } from '@api/api';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { createSVG } from 'utils/createSvg';

import { Button } from '@components/button/button';
import { Input } from '@components/input/input';

import './garageItem.style.scss';

export class GarageItem extends BaseComponent {
  public store = Store.getInstance();
  public selectCarBtn: Button;
  public removeCarBtn: Button;
  public startEngineBtn: Button;
  public stopEngineBtn: Button;
  public carName: BaseComponent<'span'>;
  public track: Input;
  public car: SVGSVGElement;
  public animateFrameID: number | null;
  constructor(public color: string, public name: string, public id: number) {
    super({
      tagName: 'div',
      classList: ['car']
    });
    this.setAttribute('id', `${this.id}`);
    this.animateFrameID = null;

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

    this.changeActiveBtn(this.stopEngineBtn, true);

    this.car = createSVG(color);

    this.render();
    this.handleDriveEngine();
    this.handleRemoveCar();
    this.handleSelectCar();
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

  public handleRemoveCar(): void {
    this.removeCarBtn.addListener('click', async () => {
      const response = await RaceApi.deleteCar(this.id);
      if (response) {
        this.destroy();
        (this.store.state.totalCar as number) -= 1;
      }
    });
  }

  public handleSelectCar(): void {
    this.selectCarBtn.addListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('selectCar', {
          detail: {
            carName: this.carName.getTextContent(),
            id: this.id
          }
        })
      );
    });
  }

  public handleDriveEngine(): void {
    this.startEngineBtn.addListener('click', async () => {
      this.changeActiveBtn(this.startEngineBtn, true);
      const { distance, velocity } = await RaceApi.startEngine(this.id);
      this.changeActiveBtn(this.stopEngineBtn, false);
      const duration = distance / velocity;
      this.track.node.max = String(distance);

      this.animationSpeed(distance, duration);

      const { success } = await RaceApi.startDrive(this.id);
      if (!success) {
        window.cancelAnimationFrame(this.animateFrameID as number);
      }
    });

    this.stopEngineBtn.addListener('click', async () => {
      const stopDrive = await RaceApi.stopEngine(this.id);
      if (stopDrive) {
        window.cancelAnimationFrame(this.animateFrameID as number);
        this.track.node.value = '0';
        this.animationImage();
        this.changeActiveBtn(this.startEngineBtn, false);
        this.changeActiveBtn(this.stopEngineBtn, true);
      }
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
        this.animateFrameID = requestAnimationFrame(animateThumb) as number;
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

    const svgRect = this.car.getBoundingClientRect().width;
    const imagePosition =
      (valueThumb / Number(this.track.node.max)) *
      (this.track.node.offsetWidth - svgRect);

    this.car.style.transform = `translateX(${imagePosition}px)`;
  }

  private changeActiveBtn(element: Button, isActive: boolean = false): void {
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
