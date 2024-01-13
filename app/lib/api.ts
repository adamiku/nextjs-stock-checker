export const api = {
  get: async <T>(url: string, params?: string): Promise<T | null> => {
    try {
      // test loading states with skeletons
      // await new Promise((res) => setTimeout(res, 3000));
      const searchParams = new URLSearchParams(params);
      searchParams.set('token', process.env.FINNHUB_API_TOKEN ?? '');

      const response = await fetch(
        `${process.env.FINNHUB_API_URL}/${url}?${searchParams.toString()}`,
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
  }
};
