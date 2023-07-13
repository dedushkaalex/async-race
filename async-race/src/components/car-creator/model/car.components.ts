import styles from '../styles.module.scss';

import { Button } from 'ui/button/button.component';
import { Input } from 'ui/input/input.component';

export const createCarInput = new Input({
  className: [styles.field],
  attrs: {
    type: 'text',
    placeholder: 'create car'
  }
});

export const updateCarInput = new Input({
  className: [styles.field],
  attrs: {
    type: 'text',
    placeholder: 'update car name...'
  }
});

export const colorCreatePickerCarInput = new Input({
  className: [],
  attrs: {
    type: 'color',
    value: '#000000'
  }
});

export const colorUpdatePickerCarInput = new Input({
  className: [],
  attrs: {
    type: 'color',
    value: '#000000'
  }
});

export const createCarBtn = new Button({
  tagName: 'button',
  className: [styles.button, styles.green],
  textContent: 'Create'
});

export const updateCarBtn = new Button({
  tagName: 'button',
  className: [styles.button, styles.purple],
  textContent: 'Update'
});

export const rageAllBtn = new Button({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Rage'
});

export const resetBtn = new Button({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Reset'
});

export const generateBtn = new Button({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Generate Car'
});
