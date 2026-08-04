import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
}), { virtual: true });

test('renders app without crashing', () => {
  render(<App />);
  // It renders the splash screen initially
  expect(screen.getByText(/Ārogya/i)).toBeInTheDocument();
  expect(screen.getByText(/Med/i)).toBeInTheDocument();
});
