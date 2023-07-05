import { BaseComponent } from 'shared/base-component/BaseComponent';

export const Home = new BaseComponent<'button'>({
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
