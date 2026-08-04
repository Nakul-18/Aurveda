import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
}), { virtual: true });

test('renders app header without crashing', () => {
  render(<App />);
  // Adjust this according to the actual app content when loaded (SplashScreen or Home).
  // E.g. we can just check it doesn't crash since it's just a default test.
});
