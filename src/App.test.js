import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom to prevent module resolution errors
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  BrowserRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

test('renders splash screen initially', () => {
  render(<App />);
  const logoElement = screen.getByText(/Ārogya/i);
  expect(logoElement).toBeInTheDocument();
});
