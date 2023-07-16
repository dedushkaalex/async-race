import { BaseComponent } from '@core/base-component';

import './link.scss';

export class Link extends BaseComponent<'a'> {
  constructor(text: string, href: string, classList: string[] = []) {
    super({
      tagName: 'a',
      classList: ['nav-link', ...classList],
      textContent: text
    });
    this.setAttribute('href', href);
  }
}
