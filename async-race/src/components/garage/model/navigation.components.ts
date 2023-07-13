import styles from '../styles.module.scss';

import { Button } from 'ui/button/button.component';

export const selectCarBtn = new Button({
  tagName: 'button',
  className: [styles.button, styles.yellow],
  textContent: 'select'
});

export const removeCarBtn = new Button({
  tagName: 'button',
  className: [styles.button, styles.blue],
  textContent: 'remove'
});
