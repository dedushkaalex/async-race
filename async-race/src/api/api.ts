import { Endpoint, EngineStatus } from '@api/enum';
import {
  Car,
  CarResponse,
  DriveStatus,
  Engine,
  Winner,
  Winners
} from '@api/interface';
import type { QueryString } from '@api/types';
import {
  BASE_URL,
  LIMIT_GARAGE,
  LIMIT_WINNERS,
  START_PAGE
} from '@constants/index';

const createQueryString = (
  queryString: QueryString[] = [
    { key: '_page', value: START_PAGE },
    { key: '_limit', value: LIMIT_GARAGE }
  ]
): string =>
  `${
    queryString.length
      ? `?${queryString.map((x) => `${x.key}=${x.value}`).join('&')}`
      : ''
  }`;

const getSortOrder = (sort: string, order: string): string => {
  return sort && order ? `&_sort=${sort}&_order=${order}` : '';
};

export class RaceApi {
  public static getCars = async (
    queryString: QueryString[] = [
      { key: '_page', value: START_PAGE },
      { key: '_limit', value: LIMIT_GARAGE }
    ]
  ): Promise<CarResponse> => {
    const response = await fetch(
      `${BASE_URL}${Endpoint.Garage}${createQueryString(queryString)}`
    );
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count') ?? '0'
    };
  };

  public static getCar = async (id: number): Promise<Car> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`);
    const data = response.json();
    return data;
  };

  public static createCar = async (
    body: Pick<Car, 'name' | 'color'>
  ): Promise<CarResponse> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = response.json();

    return data;
  };

  public static deleteCar = async (id: number): Promise<CarResponse> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`, {
      method: 'DELETE'
    });

    const data = response.json();

    return data;
  };

  public static updateCar = async (
    id: number,
    body: Pick<Car, 'name' | 'color'>
  ): Promise<CarResponse> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = response.json();

    return data;
  };

  public static startEngine = async (id: number): Promise<Engine> => {
    const response = await fetch(
      `${BASE_URL}${Endpoint.Engine}?id=${id}&status=${EngineStatus.Start}`,
      {
        method: 'PATCH'
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = response.json();

    return data;
  };

  public static stopEngine = async (id: number): Promise<Engine> => {
    const response = await fetch(
      `${BASE_URL}${Endpoint.Engine}?id=${id}&status=${EngineStatus.Stop}`,
      {
        method: 'PATCH'
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = response.json();

    return data;
  };

  public static startDrive = async (
    id: number,
    instance: AbortController
  ): Promise<DriveStatus> => {
    const { signal } = instance;
    document.addEventListener('reset', () => {
      instance.abort();
    });
    try {
      const response = await fetch(
        `${BASE_URL}${Endpoint.Engine}?id=${id}&status=${EngineStatus.Drive}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          signal
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return await response.json();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return { success: false };
    }
  };

  public static getWinners = async (
    page: number,
    limit = LIMIT_WINNERS,
    sort = 'id',
    order = 'ASC'
  ): Promise<Winners> => {
    const response = await fetch(
      `${BASE_URL}${
        Endpoint.Winners
      }?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
    );

    const data = await response.json();

    return {
      items: data,
      count: response.headers.get('X-Total-Count') ?? '0'
    };
  };

  public static getWinner = async (
    id: number
  ): Promise<Record<string, null> | Winner> => {
    const response = await fetch(`${BASE_URL}${Endpoint.Winners}/${id}`);

    const data = await response.json();

    return data;
  };

  public static deleteWinner = async (
    id: number
  ): Promise<Record<string, never>> => {
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

  public static createWinner = async (body: Winner): Promise<Winners> => {
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

  public static updateWinner = async (
    id: number,
    body: Pick<Winner, 'time' | 'wins'>
  ): Promise<Winner> => {
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
