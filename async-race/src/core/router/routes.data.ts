import { GarageScreen, NotFoundScreen, WinnersScreen } from '@screens';

export type TRoutes = {
  path: string;
  component: typeof GarageScreen | typeof WinnersScreen | typeof NotFoundScreen;
};

export const ROUTES: TRoutes[] = [
  {
    path: '/',
    component: GarageScreen
  },
  {
    path: '/winners',
    component: WinnersScreen
  }
];
