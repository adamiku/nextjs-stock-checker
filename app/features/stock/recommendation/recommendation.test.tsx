import { render } from '@testing-library/react';
import Recommendation from './recommendation';

test('renders Recommendation component', async () => {
  const jsx = await Recommendation({ symbol: 'AAPL' });
  const { container } = render(jsx);
  expect(container.firstChild).toBeInTheDocument();
});
