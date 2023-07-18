import { AppStore } from '@core/Store/Store';
import { generateOneHundredCars } from 'utils/generateOneHundredCars';

export const generateCars = async (): Promise<void> => {
  const { length } = await generateOneHundredCars();

  document.dispatchEvent(new CustomEvent('get100cars'));
  AppStore.state.totalCar += length;
};
