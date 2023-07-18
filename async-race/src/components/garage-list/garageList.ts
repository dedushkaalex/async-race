import { RaceApi } from '@api/api';
import { Car, DrivingResult } from '@api/interface';
import { LIMIT_GARAGE } from '@constants/index';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';

import { GarageItem } from '@components/garage-item/garageItem';

import './garageList.scss';

export class GarageList extends BaseComponent {
  private cars: GarageItem[];
  public store = Store.getInstance();

  public isRequestSend: boolean;
  constructor() {
    super({
      tagName: 'div',
      classList: ['car-list']
    });

    this.isRequestSend = false;
    this.cars = [];

    this.store.addObserver(this);
    this.render();

    this.customEventHandler();
  }
  // this.append(...this.cars);
  // this.node.insertAdjacentHTML('beforeend', loader());
  // setTimeout(() => {
  //   this.addTextContent('');
  // }, 1000);
  public update(): void {
    // TODO: FIXED РЕОТПРАВКУ ЗАПРОСА

    if (!this.isRequestSend) {
      this.render();
    }
  }

  public async render(): Promise<void> {
    this.isRequestSend = true;
    this.cars = [];
    this.generateCars(this.store.state.counterGarage as number);
    this.isRequestSend = false;
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
    this.store.state.totalCar = Number(items);
    console.log(this.store.state.totalCar);

    carResponse.items.forEach((car) => {
      const carItem = new GarageItem(car.color, car.name, car.id);
      cars.push(carItem);
    });
    this.cars = this.cars.concat(cars);
    this.append(...cars);
    return cars;
  }

  public customEventHandler(): void {
    document.addEventListener('get100cars', async (e) => {
      const target = e as CustomEvent;
      const arrayCars: GarageItem[] = [];
      const { items, count } = target.detail;
      this.store.state.totalCar = count;
      items.forEach((car: Car) => {
        const carItem = new GarageItem(car.color, car.name, car.id);
        arrayCars.push(carItem);
      });
      this.append(...arrayCars);
    });

    document.addEventListener('raсeAll', async () => {
      this.raceAll();
    });
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
