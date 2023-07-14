// import { cars } from '@core/Store/store';
import { cars } from '@core/Store/store';
import { BaseComponent } from '@core/base-component/BaseComponent';
import { RaceAPI } from 'api';

import { GarageItem } from '@components/garage-item/garageItem.components';

import styles from './styles.module.scss';

export class Garage extends BaseComponent<'section'> {
  public allCars: GarageItem[] = [];
  constructor() {
    super({
      tagName: 'section',
      className: [styles.section]
    });

    this.render();

    // document
  }

  public render(): void {
    cars.forEach((car) => {
      const garageItem = new GarageItem(car.name, car.color, car.id);
      this.removeEvent(garageItem.node, garageItem.removeCarBtn.node);
      this.allCars.push(garageItem);
    });
    this.append(...this.allCars);
  }

  public removeEvent(
    garageItem: HTMLElement,
    removeBtn: HTMLButtonElement
  ): void {
    garageItem.addEventListener('remove', async (e) => {
      const target = e as CustomEvent;
      const id: number = target.detail.idCar;

      try {
        await RaceAPI.deleteCar(id);
        removeBtn.disabled = true;
      } catch (error) {
        console.error(error);
      } finally {
        removeBtn.disabled = false;
      }
    });
  }
}
