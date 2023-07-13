import { BaseComponent } from '@core/base-component/BaseComponent';

import { CarCreator } from '@components/car-creator/carCreator.components';
import { Garage } from '@components/garage/garage.components';

export class GarageScreen extends BaseComponent {
  public CarCreator: CarCreator;
  public Garage: Garage;

  constructor() {
    super({
      tagName: 'div',
      className: ['container']
    });
    this.CarCreator = new CarCreator();
    this.Garage = new Garage();

    this.append(this.CarCreator, this.Garage);
  }
  public render(): BaseComponent<'p'> {
    return this;
  }
}
