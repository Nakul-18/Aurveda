import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: () => jest.fn(),
}), { virtual: true });

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getAllByText(/Ārogya/i)[0]; // Just picking a common element
  expect(headerElement).toBeInTheDocument();
});
