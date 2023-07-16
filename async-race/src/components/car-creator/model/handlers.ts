import { RaceApi } from '@api/api';
import { CarResponse } from '@api/interface';
import { generateOneHundredCars } from 'utils/generateOneHundredCars';

export const generateCars = async (): Promise<CarResponse> => {
  await generateOneHundredCars();
  const carResponse: CarResponse = await RaceApi.getCars();

  document.dispatchEvent(
    new CustomEvent('get100cars', {
      detail: {
        cars: carResponse
      }
    })
  );
  return carResponse;
};
