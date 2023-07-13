import { BaseComponent } from '@core/base-component/BaseComponent';

import { GarageItem } from '@components/garage-item/garageItem.components';

import { removeCarBtn, selectCarBtn } from './model/navigation.components';
import styles from './styles.module.scss';

export class Garage extends BaseComponent<'section'> {
  constructor() {
    super({
      tagName: 'section',
      className: [styles.section]
    });

    this.render();
  }

  public render(): void {
    this.append(
      new GarageItem(),
      new GarageItem(),
      new GarageItem(),
      new GarageItem()
    );
  }
}
