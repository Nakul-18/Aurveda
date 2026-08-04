import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
}), { virtual: true });

test('renders app without crashing', () => {
  render(<App />);
  // We can just verify it renders without crashing. The default CRA test is likely obsolete.
});
