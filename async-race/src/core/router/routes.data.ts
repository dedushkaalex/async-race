import { Garage } from 'components/screens/garage/garage.component';
import { NotFound } from 'components/screens/not-found/not-found.component';
import { Winners } from 'components/screens/winners/winners.component';

export type TRoutes = {
  path: string;
  component: typeof Garage | typeof Winners | typeof NotFound;
};

export const ROUTES: TRoutes[] = [
  {
    path: '/',
    component: Garage
  },
  {
    path: '/winners',
    component: Winners
  }
];
