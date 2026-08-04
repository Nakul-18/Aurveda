import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom due to react-scripts v5 compatibility issues
jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}), { virtual: true });

test('renders app components', () => {
  render(<App />);
  // We can just verify it renders without crashing.
  // The App initially shows SplashScreen which eventually renders a logo or title.
});
