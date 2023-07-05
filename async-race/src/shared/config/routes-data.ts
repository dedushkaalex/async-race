import { Home } from 'pages/Home/Home';
import { BaseComponent } from 'shared/base-component/BaseComponent';

export type Routes<T extends keyof HTMLElementTagNameMap> = {
  path: string;
  component: BaseComponent<T>;
};

export const ROUTES: Routes<keyof HTMLElementTagNameMap>[] = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/about',
    component: Home
  }
];
