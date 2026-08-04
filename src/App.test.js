import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}), { virtual: true });

test('renders app successfully without crashing', () => {
  render(<App />);
  // We can just verify the app rendered without crashing instead of looking for learn react, since that is a CRA template text
});
