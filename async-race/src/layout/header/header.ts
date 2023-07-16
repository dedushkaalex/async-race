import { BaseComponent } from '@core/base-component';

import { Link } from '@components/link/link';

import './header.scss';

export class Header extends BaseComponent<'header'> {
  public links;
  constructor() {
    super({
      tagName: 'header',
      classList: ['header']
    });

    this.links = {
      garage: new Link('toGarage', '/', ['green-light']),
      winners: new Link('toWinners', '/winners', ['purple-light'])
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
      classList: ['is-flex']
    });

    const nav = new BaseComponent({
      tagName: 'nav',
      classList: ['nav'],
      children: [ul]
    });

    this.append(nav);

    for (const linkElement of Object.values(this.links)) {
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
