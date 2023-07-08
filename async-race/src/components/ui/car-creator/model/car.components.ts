import { Button } from '@components/ui/button/button.component';
import { Input } from '@components/ui/input/input.components';

export const createCarInput = new Input({
  className: ['input', 'is-hovered'],
  attrs: {
    type: 'text',
    placeholder: 'create car'
  }
});

export const updateCarInput = new Input({
  className: ['input', 'is-hovered'],
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
  className: ['button', 'is-primary', 'is-light'],
  textContent: 'Create'
});

export const updateCarBtn = new Button({
  tagName: 'button',
  className: ['button', 'is-primary', 'is-light'],
  textContent: 'Update'
});

export const rageAllBtn = new Button({
  tagName: 'button',
  className: ['button', 'is-danger'],
  textContent: 'Rage'
});

export const resetBtn = new Button({
  tagName: 'button',
  className: ['button', 'is-warning'],
  textContent: 'Reset'
});

export const generateBtn = new Button({
  tagName: 'button',
  className: ['button', 'is-primary'],
  textContent: 'Generate Car'
});
