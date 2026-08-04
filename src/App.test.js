import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
}), { virtual: true });

test('renders app header without crashing', () => {
  render(<App />);
  // Check for the splash screen that is rendered initially based on App.js
  const splashScreenElement = screen.getByText(/Ārogya/i);
  expect(splashScreenElement).toBeInTheDocument();
});
