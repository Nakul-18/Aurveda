jest.mock('react-router-dom', () => ({

  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ancient Wisdom link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ancient Wisdom/i);
  expect(linkElement).toBeInTheDocument();
});
