/* eslint-disable max-lines-per-function */
import { BaseComponent } from '@core/base-component';

import styles from './toast.module.scss';

import close from '@/assets/img/icons/close.svg';

export class Toast extends BaseComponent {
  public xmark: BaseComponent<'img'>;
  public progress: BaseComponent;
  constructor(public title: string, public text: string, public img: string) {
    super({
      tagName: 'div',
      classList: [styles.toast]
    });
    this.xmark = new BaseComponent({
      tagName: 'img',
      classList: [styles.close]
    });
    this.progress = new BaseComponent({
      tagName: 'div',
      classList: [styles.progress]
    });
    this.render();
    this.setListener();
  }

  public render(): void {
    setTimeout(() => {
      this.addClass(styles.active);
      this.progress.addClass(styles.active);
    }, 500);

    setTimeout(() => {
      this.removeClass(styles.active);
    }, 5500);

    setTimeout(() => {
      this.removeClass(styles.active);
    }, 5300);

    this.xmark.setAttribute('src', close);

    const icon = new BaseComponent({
      tagName: 'img',
      classList: [styles.icon]
    });
    icon.setAttribute('src', this.img);
    const toastContent = new BaseComponent({
      tagName: 'div',
      classList: [styles['toast-content']],
      children: [
        new BaseComponent({
          tagName: 'div',
          classList: [styles.check],
          children: [icon]
        }),
        new BaseComponent({
          tagName: 'div',
          classList: [styles.message],
          children: [
            new BaseComponent({
              tagName: 'span',
              classList: [styles.text, styles['text-1']],
              textContent: this.title
            }),
            new BaseComponent({
              tagName: 'span',
              classList: [styles.text, styles['text-2']],
              textContent: this.text
            })
          ]
        })
      ]
    });
    this.append(toastContent, this.xmark, this.progress);
  }

  public setListener(): void {
    this.xmark.addListener('click', () => this.removeClass(styles.active));
    setTimeout(() => {
      this.progress.removeClass(styles.active);
    }, 300);
  }
}
