import { render } from '@testing-library/react';
import SearchResult from './search-result';

test('renders SearchResult component', () => {
  const { container } = render(<SearchResult />);
  expect(container.firstChild).toBeInTheDocument();
});
