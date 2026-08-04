import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom to resolve module resolution issues with Jest in react-scripts v5
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <a>{children}</a>,
}), { virtual: true });

test('renders App component and shows splash screen initially', () => {
  render(<App />);
  const splashLogo = screen.getByText('Ārogya');
  expect(splashLogo).toBeInTheDocument();
});
