import { BASE_URL } from '../constants';
import { Car, CarServer, WinnersServer } from './@types/interface';
import type { AllCars, AllWinners } from './@types/types';

enum Endpoint {
  Garage = '/garage',
  Winners = '/winners',
  Engine = '/engine'
}

enum Engine {
  Start = 'started',
  Stop = 'stopped',
  Drive = 'drive'
}

type QueryString = {
  key: string;
  value: number;
};

const createQueryString = (queryString: QueryString[] = []): string =>
  `${
    queryString.length
      ? `?${queryString.map((x) => `${x.key}=${x.value}`).join('&')}`
      : ''
  }`;

export class RaceAPI {
  public static getCars = async (
    queryString: QueryString[]
  ): Promise<AllCars> => {
    let response;

    try {
      response = await fetch(
        `${BASE_URL}${Endpoint.Garage}${createQueryString(queryString)}`
      );
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));

    return {
      cars: data,
      total: count
    };
  };

  public static getCar = async (id: number): Promise<Car> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`);
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static createCar = async (body: Car): Promise<Car> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static deleteCar = async (id: number): Promise<CarServer> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static updateCar = async (
    id: number,
    body: Car
  ): Promise<CarServer> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static startEngine = async (
    id: number
  ): Promise<{ velocity: number; distance: number }> => {
    const response = await fetch(
      `${BASE_URL}${Endpoint.Engine}?id=${id}&status=${Engine.Start}`,
      {
        method: 'PATCH'
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
      );
    }

    const data = response.json();

    return data;
  };

  public static driveEngine = async (
    id: number
  ): Promise<{ velocity: number; distance: number }> => {
    const response = await fetch(
      `${BASE_URL}${Endpoint.Engine}?id=${id}&status=${Engine.Drive}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = response.json();

    return data;
  };

  public static getWinners = async (
    queryString: QueryString[] = []
  ): Promise<AllWinners> => {
    let response;

    try {
      response = await fetch(
        `${BASE_URL}${Endpoint.Winners}${createQueryString(queryString)}`
      );
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));

    return {
      cars: data,
      total: count
    };
  };

  public static getWinner = async (id: number): Promise<WinnersServer> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Winners}/${id}`);
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static createWinner = async (
    body: WinnersServer
  ): Promise<WinnersServer> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = response.json();

    return data;
  };

  public static deleteWinner = async (id: number): Promise<WinnersServer> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Winners}/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };

  public static updateWinner = async (
    id: number,
    body: WinnersServer
  ): Promise<WinnersServer> => {
    let response;
    try {
      response = await fetch(`${BASE_URL}${Endpoint.Winners}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.error((error as Error).message);
      throw error;
    }

    const data = response.json();

    return data;
  };
}
