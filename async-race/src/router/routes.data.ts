import { GarageScreen } from '@screens/garage/garageScreen';
import { NotFoundScreen } from '@screens/not-found/notFoundScreen';
import { WinnersScreen } from '@screens/winners/winnersScreen';

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
