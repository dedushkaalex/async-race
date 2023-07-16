import { RaceApi } from '@api/api';
import { Car, CarResponse } from '@api/interface';

import { getRandomName } from './getRandomCarName';
import { getRandomColor } from './getRandomColor';

export function generateOneHundredCars(): Promise<CarResponse[]> {
  const generateCarRequest = (): Pick<Car, 'name' | 'color'> => {
    return {
      name: getRandomName(),
      color: getRandomColor()
    };
  };

  const arrayCars = [];
  for (let i = 0; i < 100; i += 1) {
    arrayCars.push(RaceApi.createCar(generateCarRequest()));
  }

  return Promise.all(arrayCars);
}
