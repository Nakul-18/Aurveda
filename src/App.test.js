import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
}), { virtual: true });

test('renders app component', () => {
  render(<App />);
});
