import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    useNavigate: () => jest.fn(),
    Link: ({ children }) => <div>{children}</div>,
  };
}, { virtual: true });

test('renders App component without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
