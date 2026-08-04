import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ search: '' }),
  useSearchParams: () => [new URLSearchParams(), jest.fn()]
}), { virtual: true });

test('renders app', () => {
  render(<App />);
});
