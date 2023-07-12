import { CarServer, WinnersServer } from '../interface';

export type AllCars = {
  cars: CarServer[];
  total: number | null;
};

export type AllWinners = {
  cars: WinnersServer[];
  total: number | null;
};
