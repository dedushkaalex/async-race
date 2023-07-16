import { BaseComponent } from '@core/base-component';

import './button.scss';

export class Button extends BaseComponent<'button'> {
  constructor(
    public textContent: string,
    public classList: string[] = [],
    public onClick: () => void = (): void => {}
  ) {
    super({
      tagName: 'button',
      classList: ['button', ...classList],
      textContent
    });

    this.node.onclick = (e: Event): void => {
      e.preventDefault();
      this.onClick();
    };
  }

  public updateOnClick(onClick: () => void): void {
    this.onClick = onClick;
  }
}
