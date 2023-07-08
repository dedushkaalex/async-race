import { BASE_URL } from '../constants';
import { Car, CarServer } from './@types/interface';
import type { AllCars } from './@types/types';

enum Endpoint {
  Garage = '/garage',
  Winners = '/winners',
  Engine = '/engine'
}

export class RaceAPI {
  /**
   * @async
   * @param {number} [page=0] Current page
   * @param {number} [limit=5] Cars per page
   * @returns {Promise<AllCars>} Array of cars in the garage
   */
  public static getCars = async (
    page: number = 0,
    limit: number = 5
  ): Promise<AllCars> => {
    const queryParams = {
      _page: `${page}`,
      _limit: `${limit}`
    };

    const searchParams = new URLSearchParams(queryParams).toString();

    let response;

    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}?${searchParams}`);
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return {
      cars: await response.json(),
      total: response.headers.get('X-Total-Count')
    };
  };

  /**
   * Description placeholder
   * @date 7/9/2023 - 2:34:00 AM
   *
   * @async
   * @param {number} id car
   * @returns {Promise<Car>} car Object
   */
  public static getCar = async (id: number): Promise<Car> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`);
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}
