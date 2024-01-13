import { render, screen } from '@testing-library/react';
import CurrentPrice from './current-price';

const mockResponse = {
  data: {
    c: 50,
    pc: 45
  }
};

jest.mock('@/app/lib/api', () => ({
  __esModule: true,
  api: {
    get: jest.fn().mockReturnValue({
      c: 50,
      pc: 45
    })
  }
}));

describe('CurrentPrice component', () => {
  test('renders current price correctly', async () => {
    const jsx = await CurrentPrice({ symbol: 'AAPL' });
    render(jsx);

    const expectedClassName =
      mockResponse.data.c > mockResponse.data.pc
        ? 'text-green-500'
        : 'text-red-500';

    const priceElement = screen.getByText(mockResponse.data.c.toString());
    expect(priceElement).toHaveClass(expectedClassName);
  });
});
