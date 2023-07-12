/* eslint-disable @typescript-eslint/no-throw-literal */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-underscore-dangle */
// import type { CorsConfig, HTTPMethods, HeadersConfig } from 'api/globalTypes';

// const BASE_URL = 'http://127.0.0.1:3000';

interface HttpResponse<T> extends Response {
  data?: T;
  status: number;
}

export const garageAPI = {
  getCars: async <T>(request: string): Promise<HttpResponse<T>> => {
    const response: HttpResponse<T> = await fetch(request);
    try {
      response.data = await response.json();
    } catch (e) {
      if (typeof e === 'string') {
        e.toUpperCase();
      } else if (e instanceof Error) {
        throw e.message;
      }
    }
    return response.data as HttpResponse<T>;
  }
};
