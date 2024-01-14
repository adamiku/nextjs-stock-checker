import { cache } from 'react';

export const api = {
  get: cache(async <T>(url: string, params?: string): Promise<T | null> => {
    try {
      // test loading states with skeletons
      // await new Promise((res) => setTimeout(res, 2000));
      const searchParams = new URLSearchParams(params);
      searchParams.set('token', process.env.FINNHUB_API_TOKEN ?? '');

      const rand = Math.random();

      console.time(
        `api request: ${process.env.FINNHUB_API_URL}/${url}?${searchParams.toString()} - ${rand}`
      );
      const response = await fetch(
        `${process.env.FINNHUB_API_URL}${url}?${searchParams.toString()}`,
        {
          method: 'GET'
        }
      );
      console.timeEnd(
        `api request: ${process.env.FINNHUB_API_URL}/${url}?${searchParams.toString()} - ${rand}`
      );
      console.log(
        '====================================================================='
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return null;
        // handle 40X,50X errors
      }

      return response.json();
    } catch (error) {
      console.error(error);
      // handle network errors
      return null;
    }
  })
};

export const alphaApi = {
  get: cache(async <T>(url: string, params?: string): Promise<T | null> => {
    try {
      // test loading states with skeletons
      // await new Promise((res) => setTimeout(res, 3000));

      // TODO test environment variables presence
      const searchParams = new URLSearchParams(params);
      searchParams.set('apikey', process.env.ALPHA_API_TOKEN ?? '');

      const response = await fetch(
        `${process.env.ALPHA_API_URL}/${url}?${searchParams.toString()}`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return null;
        // handle 40X,50X errors
      }

      return response.json();
    } catch (error) {
      console.error(error);
      // handle network errors
      return null;
    }
  })
};
