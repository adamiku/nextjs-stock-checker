import { render } from '@testing-library/react';
import Recommendation from './recommendation';

test('renders Recommendation component', () => {
  const { container } = render(<Recommendation />);
  expect(container.firstChild).toBeInTheDocument();
});
