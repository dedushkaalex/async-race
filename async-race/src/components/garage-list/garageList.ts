import { RaceApi } from '@api/api';
import { Car, CarResponse, Engine } from '@api/interface';
import { LIMIT_GARAGE } from '@constants/index';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';

import { GarageItem } from '@components/garage-item/garageItem';

import './garageList.scss';

export class GarageList extends BaseComponent {
  private cars: GarageItem[];
  public store = Store.getInstance();
  constructor() {
    super({
      tagName: 'div',
      classList: ['car-list']
    });

    this.cars = [];

    this.store.addObserver(this);
    this.render();

    this.customEventHandler();
  }

  public update(): void {
    this.render();
    // this.node.insertAdjacentHTML('beforeend', loader());
    // setTimeout(() => {
    //   this.addTextContent('');
    // }, 1000);
  }

  public async render(): Promise<void> {
    this.append(
      ...(await this.generateCars(this.store.state.counterGarage as number))
    );
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
    this.store.state.totalCar = items;
    console.log(this.store.state.totalCar);

    carResponse.items.forEach((car) => {
      const carItem = new GarageItem(car.color, car.name, car.id);
      cars.push(carItem);
    });
    this.cars = this.cars.concat(cars);
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

    document.addEventListener('rageAll', async () => {
      const allStartEngineArray: Array<Promise<Engine>> = [];
      this.cars.forEach((item) => {
        allStartEngineArray.push(RaceApi.startEngine(item.id));
      });
      const startEngines = await Promise.all(allStartEngineArray);
      console.log(s);
    });
  }
}
