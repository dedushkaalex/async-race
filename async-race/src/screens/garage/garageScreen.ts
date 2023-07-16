import { BaseComponent } from '@core/base-component';

import { CarCreator } from '@components/car-creator/carCreator';
import { GarageList } from '@components/garage-list/garageList';

export class GarageScreen extends BaseComponent {
  public CarCreator: CarCreator;
  public GarageList: GarageList;
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });

    this.CarCreator = new CarCreator();
    this.GarageList = new GarageList();
  }

  public render(): BaseComponent<'p'> {
    this.append(this.CarCreator, this.GarageList);
    return this;
  }
}
