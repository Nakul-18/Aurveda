import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({})
}), { virtual: true });

test('renders splash screen and then app', async () => {
  render(<App />);
  const titleElement = screen.getByText(/Ārogya/i);
  expect(titleElement).toBeInTheDocument();
});
