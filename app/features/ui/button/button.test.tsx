import { render } from '@testing-library/react';
import Button from './button';

test('renders Button component', () => {
  const { container } = render(<Button />);
  expect(container.firstChild).toBeInTheDocument();
});
