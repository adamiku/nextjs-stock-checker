import { render } from '@testing-library/react';
import SearchBar from './search-bar';

test('renders SearchBar component', () => {
  const { container } = render(<SearchBar />);
  expect(container.firstChild).toBeInTheDocument();
});
