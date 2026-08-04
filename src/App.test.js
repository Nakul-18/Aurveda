import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header without crashing', () => {
  render(<App />);
  const logoElement = screen.getByText(/Ārogya/i);
  expect(logoElement).toBeInTheDocument();
});
