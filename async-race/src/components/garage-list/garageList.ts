import { RaceApi } from '@api/api';
import { DrivingResult } from '@api/interface';
import { LIMIT_GARAGE } from '@constants/index';
import { AppStore } from '@core/Store/Store';
import { BaseComponent } from '@core/base-component';

import { GarageItem } from '@components/garage-item/garageItem';

import './garageList.scss';

export class GarageList extends BaseComponent {
  private cars: GarageItem[];
  constructor() {
    super({
      tagName: 'div',
      classList: ['car-list']
    });

    AppStore.subscribe('count', this.update.bind(this));
    // TODO: не подписываемся на totalCar, иначе дубль запросов
    // AppStore.subscribe('totalCar', this.update.bind(this));
    document.addEventListener('get100cars', () => this.update());
    document.addEventListener('removeCar', () => this.update());

    this.cars = [];
    this.render();
  }
  public update(): void {
    this.addTextContent('');
    this.render();
    console.log('Состояние гаража обновлено:', AppStore.state);
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

  // eslint-disable-next-line max-lines-per-function
  public async raceAll(): Promise<void> {
    const promisesAll = this.cars.map(async (item) => {
      return RaceApi.startEngine(item.id);
    });

    const arrayEngineCharacter = await Promise.all(promisesAll);
    arrayEngineCharacter.forEach((engine, index) => {
      this.cars[index].changeActiveBtn(this.cars[index].startEngineBtn, true);
      this.cars[index].changeActiveBtn(this.cars[index].stopEngineBtn, false);
      const { distance, velocity } = engine;
      const duration = distance / velocity;
      this.cars[index].track.node.max = String(distance);
      this.cars[index].animationSpeed(distance, duration);
    });

    const promisesDriveCar = this.cars.map(
      async (item, index): Promise<DrivingResult | undefined> => {
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
          return { success, carId: item.id, time };
        }
        this.cars[index].changeActiveBtn(this.cars[index].startEngineBtn, true);
        this.cars[index].changeActiveBtn(this.cars[index].stopEngineBtn, false);
        return Promise.reject(new Error(`Response error`));
      }
    );
    const promiseDriveResult = await Promise.any(promisesDriveCar);
    document.dispatchEvent(new CustomEvent('carArrived'));
  }
}
