import { render } from '@testing-library/react';
import PriceChart from './price-chart';

test('renders PriceChart component', () => {
  const { container } = render(<PriceChart />);
  expect(container.firstChild).toBeInTheDocument();
});
