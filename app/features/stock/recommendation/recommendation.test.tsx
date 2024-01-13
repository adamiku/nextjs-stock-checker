import { render } from '@testing-library/react';
import Recommendation from './recommendation';

jest.mock('@/app/lib/api', () => ({
  __esModule: true,
  api: {
    get: jest.fn().mockReturnValue([])
  }
}));

test('renders Recommendation component', async () => {
  const jsx = await Recommendation({ symbol: 'AAPL' });
  const { container } = render(jsx);
  expect(container.firstChild).toBeInTheDocument();
});
