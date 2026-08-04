import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom due to compatibility issues with Jest/react-scripts v5
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });

test('renders telemedicine app', () => {
  render(<App />);
  // Adjust this test based on what is actually rendered initially
  const headerElement = screen.getByText(/Ancient Wisdom/i);
  expect(headerElement).toBeInTheDocument();
});
