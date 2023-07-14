/* eslint-disable @typescript-eslint/no-unused-expressions */
import { BaseComponent } from '@core/base-component/BaseComponent';
import { RaceAPI } from 'api';

import styles from '../styles.module.scss';

export const createCarInput = new BaseComponent<'input'>({
  tagName: 'input',
  className: [styles.field],
  attrs: {
    type: 'text',
    placeholder: 'create car'
  }
});

export const updateCarInput = new BaseComponent<'input'>({
  tagName: 'input',
  className: [styles.field],
  attrs: {
    type: 'text',
    placeholder: 'update car name...'
  }
});

export const colorCreatePickerCarInput = new BaseComponent<'input'>({
  tagName: 'input',
  className: [],
  attrs: {
    type: 'color',
    value: '#000000'
  }
});

export const colorUpdatePickerCarInput = new BaseComponent<'input'>({
  tagName: 'input',
  className: [],
  attrs: {
    type: 'color',
    value: '#000000'
  }
});

export const createCarBtn = new BaseComponent<'button'>({
  tagName: 'button',
  className: [styles.button, styles.green],
  textContent: 'Create',
  attrs: {
    onclick: async (): Promise<void> => {
      const { node: input } = createCarInput;
      const { node: colorPicker } = colorCreatePickerCarInput;
      if (!input.value.trim().length) {
        return;
      }
      await RaceAPI.createCar({
        name: input.value,
        color: colorPicker.value
      });
    }
  }
});

export const updateCarBtn = new BaseComponent({
  tagName: 'button',
  className: [styles.button, styles.purple],
  textContent: 'Update'
});

export const rageAllBtn = new BaseComponent({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Rage'
});

export const resetBtn = new BaseComponent({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Reset'
});

export const generateBtn = new BaseComponent({
  tagName: 'button',
  className: [styles.button],
  textContent: 'Generate Car'
});
