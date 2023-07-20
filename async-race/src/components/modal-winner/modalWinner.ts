/* eslint-disable max-lines-per-function */
import { BaseComponent } from '@core/base-component';

import styles from './modalWinner.module.scss';

import winner from '@/assets/img/icons/winner.svg';

export class Modal extends BaseComponent {
  public modal: BaseComponent;
  public content: BaseComponent;
  public img: BaseComponent<'img'>;
  constructor(public name: string, public time: number) {
    super({
      tagName: 'div',
      classList: [styles['modal-wrapper'], styles.open]
    });
    this.img = new BaseComponent({
      tagName: 'img',
      classList: [styles['winner-logo']]
    });
    this.img.setAttribute('src', winner);

    this.content = new BaseComponent({
      tagName: 'div',
      classList: [styles.content],
      children: [
        new BaseComponent({
          tagName: 'div',
          classList: [styles['good-job']],
          children: [
            this.img,
            new BaseComponent({
              tagName: 'h1',
              classList: [styles.name],
              textContent: `Winner: ${this.name}`
            }),
            new BaseComponent({
              tagName: 'h1',
              classList: [styles.time],
              textContent: `Time: ${this.time} (s)`
            })
          ]
        })
      ]
    });

    this.modal = new BaseComponent({
      tagName: 'div',
      classList: [styles.modal],
      children: [
        new BaseComponent({
          tagName: 'div',
          classList: [styles.head]
        }),
        this.content
      ]
    });
    this.render();
    this.setListener();
  }

  public render(): void {
    this.append(this.modal);
  }

  public setListener(): void {
    setTimeout(() => {
      this.addClass(styles.open);
    }, 500);

    setTimeout(() => {
      this.removeClass(styles.open);
    }, 2500);
  }
}
