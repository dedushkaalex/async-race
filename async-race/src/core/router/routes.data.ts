import { GarageScreen, NotFound, Winners } from '@screens';

export type TRoutes = {
  path: string;
  component: typeof GarageScreen | typeof Winners | typeof NotFound;
};

export const ROUTES: TRoutes[] = [
  {
    path: '/',
    component: GarageScreen
  },
  {
    path: '/winners',
    component: Winners
  }
];
