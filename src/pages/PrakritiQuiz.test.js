import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PrakritiQuiz from './PrakritiQuiz';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate,
  };
}, { virtual: true });

test('navigates when logo is clicked', () => {
  render(<PrakritiQuiz />);
  const logo = screen.getByText('Ārogya');
  fireEvent.click(logo);
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
