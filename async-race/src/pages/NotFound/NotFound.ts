import { BaseComponent } from 'shared/base-component/BaseComponent';

export const NotFound = new BaseComponent<'h1'>({
  tagName: 'h1',
  className: ['display-1'],
  attrs: {
    onclick: (): void => console.log(2)
  },
  textContent: '404 not found'
});
