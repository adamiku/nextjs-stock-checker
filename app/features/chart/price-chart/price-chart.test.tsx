import { render } from '@testing-library/react';
import PriceChart from './price-chart';

jest.mock('react-chartjs-2', () => ({
  __esModule: true,
  Line: jest.fn().mockReturnValue(<div>Mock Line Chart</div>)
}));

test('renders PriceChart component', () => {
  const { container } = render(
    <PriceChart
      symbol="AAPL"
      closingPrices={[1, 2, 3]}
      labels={['jan', 'feb', 'mar']}
    />
  );
  expect(container.firstChild).toBeInTheDocument();
});
