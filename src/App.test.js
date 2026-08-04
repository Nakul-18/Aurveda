import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  MemoryRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

test('renders app without crashing', () => {
  render(
    <App />
  );
});
