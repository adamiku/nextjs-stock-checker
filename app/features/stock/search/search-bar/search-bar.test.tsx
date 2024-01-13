import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './search-bar';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  }),
  usePathname: jest.fn()
}));

test('renders SearchBar component', () => {
  render(<SearchBar query="" />);
  const labelElement = screen.getByText(/Enter Ticker Symbol/i);
  expect(labelElement).toBeInTheDocument();
});

test('searches when button is clicked', () => {
  render(<SearchBar query="" />);
  const inputElement = screen.getByPlaceholderText(/US stock ticker/i);
  const buttonElement = screen.getByText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'AAPL' } });
  fireEvent.click(buttonElement);
});
