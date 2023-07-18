import { FADE_IN, FADE_OUT } from '@constants/index';
import { AppStore } from '@core/Store/Store';
import { BaseComponent } from '@core/base-component';
import { fadeIn, fadeOut } from 'utils/fadeAnimations';

import { CarCreator } from '@components/car-creator/carCreator';
import { GarageList } from '@components/garage-list/garageList';

export class GarageScreen extends BaseComponent {
  public title: BaseComponent<'h1'>;

  public CarCreator: CarCreator;
  public GarageList: GarageList;
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });

    AppStore.subscribe('totalCar', this.update.bind(this));
    this.CarCreator = new CarCreator();
    this.title = new BaseComponent<'h1'>({
      tagName: 'h1',
      classList: ['title'],
      textContent: `Garage [${AppStore.state.totalCar}]`
    });
    this.GarageList = new GarageList();
  }

  public render(): BaseComponent {
    this.append(this.CarCreator);
    this.append(this.title);
    this.append(this.GarageList);
    return this;
  }
  public update(): void {
    this.title.addTextContent(`Garage [${AppStore.state.totalCar}]`);
    fadeIn(this.GarageList.node, FADE_IN);
    fadeOut(this.GarageList.node, FADE_OUT);
    this.GarageList.destroy();
    this.append(this.GarageList);
  }
}
