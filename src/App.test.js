import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ children }) => <div>{children}</div>,
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
  };
}, { virtual: true });

test('renders app', () => {
  render(<App />);
});
