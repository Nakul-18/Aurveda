import { render, screen, fireEvent, act } from '@testing-library/react';
import PrakritiQuiz from './PrakritiQuiz';

jest.useFakeTimers();

describe('PrakritiQuiz Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'arogyamed_token') return 'mock_token';
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const answerAllQuestions = (choiceIndex) => {
    for (let i = 0; i < 10; i++) {
      const options = screen.getAllByRole('button', { name: /→/i });
      fireEvent.click(options[choiceIndex]);
      act(() => {
        jest.advanceTimersByTime(350);
      });
    }
  };

  test('renders quiz initial state correctly', () => {
    render(<PrakritiQuiz />);
    expect(screen.getByText(/Discover Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Prakriti/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1 of 10/i)).toBeInTheDocument();
    expect(screen.getByText(/What is your body frame\?/i)).toBeInTheDocument();
  });

  test('progresses to next question on selecting an option', () => {
    render(<PrakritiQuiz />);

    const option = screen.getByText(/Thin & Light/i);
    fireEvent.click(option);

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(screen.getByText(/Question 2 of 10/i)).toBeInTheDocument();
    expect(screen.getByText(/How is your skin texture\?/i)).toBeInTheDocument();
  });

  test('completes quiz and shows Vata result', async () => {
    render(<PrakritiQuiz />);
    answerAllQuestions(0); // Vata options

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getAllByText('Vata').length).toBeGreaterThan(0);
    expect(screen.getByText(/You are creative, energetic/i)).toBeInTheDocument();
    expect(screen.getByText(/Result saved to your profile!/i)).toBeInTheDocument();
  });

  test('completes quiz and shows Pitta result', async () => {
    render(<PrakritiQuiz />);
    answerAllQuestions(1); // Pitta options

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getAllByText('Pitta').length).toBeGreaterThan(0);
    expect(screen.getByText(/You are intelligent, ambitious/i)).toBeInTheDocument();
  });

  test('completes quiz and shows Kapha result', async () => {
    render(<PrakritiQuiz />);
    answerAllQuestions(2); // Kapha options

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getAllByText('Kapha').length).toBeGreaterThan(0);
    expect(screen.getByText(/You are calm, steady/i)).toBeInTheDocument();
  });

  test('retake quiz resets to first question', async () => {
    render(<PrakritiQuiz />);
    answerAllQuestions(0);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getAllByText('Vata').length).toBeGreaterThan(0);

    const retakeButton = screen.getByText(/Retake Quiz/i);
    fireEvent.click(retakeButton);

    expect(screen.getByText(/Question 1 of 10/i)).toBeInTheDocument();
  });

  test('save result without auth shows login message', async () => {
    Storage.prototype.getItem = jest.fn(() => null);

    render(<PrakritiQuiz />);
    answerAllQuestions(0);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Login to save your result!/i)).toBeInTheDocument();
  });

  test('save result with API success shows success message', async () => {
    render(<PrakritiQuiz />);
    answerAllQuestions(0);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Result saved to your profile!/i)).toBeInTheDocument();
  });

  test('save result with API error shows error message', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    render(<PrakritiQuiz />);
    answerAllQuestions(0);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Could not save. Check backend connection./i)).toBeInTheDocument();
  });

  test('save result with API success false shows error message', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ success: false }),
    }));

    render(<PrakritiQuiz />);
    answerAllQuestions(0);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Could not save. Check backend connection./i)).toBeInTheDocument();
  });
});
