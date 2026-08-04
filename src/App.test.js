import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ search: '' })
}), { virtual: true });

test('renders splash screen initially', () => {
  render(<App />);
  const splashElement = screen.getByText(/Loading Ayurvedic wisdom.../i);
  expect(splashElement).toBeInTheDocument();
});
