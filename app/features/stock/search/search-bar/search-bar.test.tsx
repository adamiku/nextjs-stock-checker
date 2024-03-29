import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchBar from './search-bar';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

test('renders SearchBar component', () => {
  render(<SearchBar query="AAPL" />);
  const labelElement = screen.getByText(/Enter Ticker Symbol/i);
  expect(labelElement).toBeInTheDocument();
});

test('searches when button is clicked', () => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock
  });
  render(<SearchBar query="AAPL" />);
  const inputElement = screen.getByPlaceholderText(/US stock ticker/i);
  const buttonElement = screen.getByText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'AAPL' } });
  fireEvent.click(buttonElement);
  expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('?query=AAPL'));
});
