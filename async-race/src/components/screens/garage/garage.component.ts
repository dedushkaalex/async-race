import { BaseComponent } from '@core/base-component/BaseComponent';

import { CarCreator } from '@components/ui/car-creator/carCreator.components';

export class Garage extends BaseComponent {
  public CarCreator: CarCreator;

  constructor() {
    super({
      tagName: 'div',
      className: ['container']
    });
    this.CarCreator = new CarCreator();

    this.append(this.CarCreator);
  }
  public render(): BaseComponent<'p'> {
    return this;
  }
}
