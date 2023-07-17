import { RaceApi } from '@api/api';
import { FADE_IN, FADE_OUT } from '@constants/index';
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { fadeIn, fadeOut } from 'utils/fadeAnimations';

import { CarCreator } from '@components/car-creator/carCreator';
import { GarageList } from '@components/garage-list/garageList';

export class GarageScreen extends BaseComponent {
  public title: BaseComponent<'h1'>;
  public store = Store.getInstance();

  public CarCreator: CarCreator;
  public GarageList: GarageList;
  constructor() {
    super({
      tagName: 'div',
      classList: ['container']
    });

    this.store.addObserver(this);
    this.CarCreator = new CarCreator();
    this.title = new BaseComponent<'h1'>({
      tagName: 'h1',
      classList: ['title'],
      textContent: `Garage [${this.store.state.totalCar}]`
    });
    this.GarageList = new GarageList();

    document.addEventListener('createCar', () => {
      this.store.updateComponent();
    });
  }

  public render(): BaseComponent {
    this.append(this.CarCreator);
    this.append(this.title);
    this.append(this.GarageList);
    return this;
  }
  public update(): void {
    this.title.addTextContent(`Garage [${this.store.state.totalCar}]`);
    fadeOut(this.GarageList.node, FADE_OUT);
    fadeIn(this.GarageList.node, FADE_IN);
    this.GarageList.addTextContent('');
    this.append(this.GarageList);
  }
}
