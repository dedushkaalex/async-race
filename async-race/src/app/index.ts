import { BaseComponent } from 'shared/base-component/BaseComponent';

import './styles/style.scss';

export const component = new BaseComponent({
  tagName: 'button',
  className: ['btn', 'btn-danger'],
  attrs: {
    style: {
      color: 'black',
      width: '300px'
    },
    onclick: (): void => console.log(2)
  },
  textContent: 'hello'
});
