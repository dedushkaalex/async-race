import { RaceApi } from '@api/api';
import { Car, CarResponse } from '@api/interface';
import { BaseComponent } from '@core/base-component';

import { GarageItem } from '@components/garage-item/garageItem';

import './garageList.scss';

export class GarageList extends BaseComponent {
  constructor() {
    super({
      tagName: 'div',
      classList: ['car-list']
    });
    // this.GarageItem = new GarageItem('red', 'ss', 9);

    const title = new BaseComponent({
      tagName: 'h1',
      classList: ['title'],
      textContent: 'Garage []'
    });
    this.append(title);
    this.render();
  }

  public async render(): Promise<void> {
    this.append(...(await this.generateCars()));
  }

  public async generateCars(): Promise<GarageItem[]> {
    const cars: GarageItem[] = [];
    const carResponse: CarResponse = await RaceApi.getCars();
    carResponse.items.forEach((car) => {
      const carItem = new GarageItem(car.color, car.name, car.id);
      cars.push(carItem);
    });
    return cars;
  }

  public customEventHandler(): void {
    document.addEventListener('get100cars', async (e) => {
      const target = e as CustomEvent;
      const arrayCars: GarageItem[] = [];
      const { cars } = target.detail;
      cars.forEach((car: Car) => {
        const carItem = new GarageItem(car.color, car.name, car.id);
        arrayCars.push(carItem);
      });
      this.append(...arrayCars);
    });
  }
}
