import { RaceApi } from '@api/api';
import { DriveResult, Engine } from '@api/interface';
import { FADE_IN, FADE_OUT, LIMIT_GARAGE } from '@constants/index';
import { AppStore } from '@core/Store/Store';
import { BaseComponent } from '@core/base-component';
import { fadeIn, fadeOut } from 'utils/fadeAnimations';
import { saveWinner } from 'utils/saveWinner';

import { GarageItem } from '@components/garage-item/garageItem';
import { Modal } from '@components/modal-winner/modalWinner';

import './garageList.scss';

export class GarageList extends BaseComponent {
  private cars: GarageItem[];
  constructor() {
    super({
      tagName: 'div',
      classList: ['car-list']
    });

    AppStore.subscribe('count', this.update.bind(this));
    document.addEventListener('get100cars', () => this.update());
    document.addEventListener('removeCar', () => this.update());

    this.cars = [];
    this.render();
  }
  public update(): void {
    fadeOut(this.node, FADE_OUT);
    fadeIn(this.node, FADE_IN, () => this.render());
  }

  public async render(): Promise<void> {
    this.generateCars(AppStore.state.count);
  }

  public async generateCars(page: number): Promise<GarageItem[]> {
    const cars: GarageItem[] = [];
    const carResponse = await RaceApi.getCars([
      { key: '_page', value: page },
      { key: '_limit', value: LIMIT_GARAGE },
      { key: '_sort', value: 'id' },
      { key: '_order', value: 'desc' }
    ]);
    const items = carResponse.count;
    AppStore.state.totalCar = Number(items);

    carResponse.items.forEach((car) => {
      const carItem = new GarageItem(car.color, car.name, car.id);
      cars.push(carItem);
    });
    this.cars = [...cars];
    this.append(...cars);
    return cars;
  }

  public async raceAll(): Promise<void> {
    const promisesAll = this.cars.map(async (item) => {
      return RaceApi.startEngine(item.id);
    });

    const arrayEngineCharacter = await Promise.all(promisesAll);
    this.startDriveCars(arrayEngineCharacter);
    const promisesDriveCar = await this.getDriveCarPromises(
      arrayEngineCharacter
    );
    try {
      const promiseDriveResult = await Promise.any(promisesDriveCar);

      this.saveResultCar(promiseDriveResult);
    } catch (error) {
      console.error('Все машины сломались');
    }

    document.dispatchEvent(new CustomEvent('carArrived'));
  }

  private startDriveCars(arrayEngineCharacter: Engine[]): void {
    arrayEngineCharacter.forEach((engine, index) => {
      this.cars[index].changeActiveBtn(this.cars[index].startEngineBtn, true);
      this.cars[index].changeActiveBtn(this.cars[index].stopEngineBtn, false);
      const { distance, velocity } = engine;
      const duration = distance / velocity;
      this.cars[index].track.node.max = String(distance);
      this.cars[index].animationSpeed(distance, duration);
    });
  }

  private async getDriveCarPromises(
    arrayEngineCharacter: Engine[]
  ): Promise<Promise<DriveResult>[]> {
    const promisesDriveCar = this.cars.map(
      async (item, index): Promise<DriveResult> => {
        const { success } = await RaceApi.startDrive(
          item.id,
          new AbortController()
        );
        if (!success) {
          window.cancelAnimationFrame(item.animateFrameID as number);
        }
        if (success) {
          const carEngineCharacter = arrayEngineCharacter[index];
          const time = Number(
            (
              carEngineCharacter.distance /
              carEngineCharacter.velocity /
              1000
            ).toFixed(2)
          );
          return {
            success,
            carId: item.id,
            time,
            carName: item.carName.getTextContent(),
            color: item.color
          };
        }
        this.cars[index].changeActiveBtn(this.cars[index].startEngineBtn, true);
        this.cars[index].changeActiveBtn(this.cars[index].stopEngineBtn, false);
        return Promise.reject(new Error(`Response error`));
      }
    );
    return promisesDriveCar;
  }

  private async saveResultCar(
    driveResult: DriveResult | undefined
  ): Promise<void> {
    const { carId, time, carName, color } = driveResult as DriveResult;
    await saveWinner({ id: carId, time, carName, color });
    const modal = new Modal(carName, time);
    this.append(modal);
    // TODO: описать модалку
    // TODO: удалить модалку
    // TODO: обновить страницу
  }
}
