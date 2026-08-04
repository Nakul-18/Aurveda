import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children, element }) => element,
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

test('renders app component successfully', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ancient Wisdom/i);
  expect(linkElement).toBeInTheDocument();
});
