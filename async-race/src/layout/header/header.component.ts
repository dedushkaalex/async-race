/* eslint-disable guard-for-in */
import { BaseComponent } from '@core/base-component/BaseComponent';

import styles from './style.module.scss';

enum Links {
  garage = '/',
  winners = '/winners'
}

export class Header extends BaseComponent<'header'> {
  public links;
  constructor() {
    super({
      tagName: 'header',
      className: [styles.header, 'p-6']
    });

    this.links = {
      toGarage: new BaseComponent({
        tagName: 'a',
        className: [styles.button, styles['green-light']],
        textContent: 'to Garage',
        attrs: {
          href: Links.garage
        }
      }),
      toWinners: new BaseComponent({
        tagName: 'a',
        className: [styles.button, styles['purple-light']],
        textContent: 'to Winners',
        attrs: {
          href: Links.winners
        }
      })
    };

    this.render();
  }

  public render(): void {
    const navBar = this.createNavbar();
    this.append(navBar);
  }

  public createNavbar(): BaseComponent<'nav'> {
    const ul = new BaseComponent({
      tagName: 'ul',
      className: ['is-flex']
    });

    const nav = new BaseComponent({
      tagName: 'nav',
      className: [styles.nav],
      children: [ul]
    });

    this.append(nav);

    for (const linkElement of Object.values(this.links)) {
      console.log(linkElement);
      ul.append(
        new BaseComponent<'li'>({
          tagName: 'li',
          children: [linkElement]
        })
      );
    }

    return nav;
  }
}
