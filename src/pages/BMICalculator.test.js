import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BMICalculator from './BMICalculator';

describe('BMICalculator Component', () => {
  test('Calculate button is disabled initially', () => {
    render(<BMICalculator />);
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI/i });
    expect(calculateButton).toBeDisabled();
  });

  test('Calculates and displays Underweight category', async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByPlaceholderText('e.g. 170');
    const weightInput = screen.getByPlaceholderText('e.g. 65');
    const ageInput = screen.getByPlaceholderText('e.g. 25');
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI/i });

    await userEvent.type(heightInput, '170');
    await userEvent.type(weightInput, '50');
    await userEvent.type(ageInput, '25');

    expect(calculateButton).toBeEnabled();
    await userEvent.click(calculateButton);

    const categories = screen.getAllByText('Underweight');
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Calculates and displays Normal Weight category', async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByPlaceholderText('e.g. 170');
    const weightInput = screen.getByPlaceholderText('e.g. 65');
    const ageInput = screen.getByPlaceholderText('e.g. 25');
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI/i });

    await userEvent.type(heightInput, '170');
    await userEvent.type(weightInput, '65');
    await userEvent.type(ageInput, '25');

    await userEvent.click(calculateButton);

    expect(screen.getByText('Normal Weight')).toBeInTheDocument();
  });

  test('Calculates and displays Overweight category', async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByPlaceholderText('e.g. 170');
    const weightInput = screen.getByPlaceholderText('e.g. 65');
    const ageInput = screen.getByPlaceholderText('e.g. 25');
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI/i });

    await userEvent.type(heightInput, '170');
    await userEvent.type(weightInput, '80');
    await userEvent.type(ageInput, '25');

    await userEvent.click(calculateButton);

    const categories = screen.getAllByText('Overweight');
    expect(categories.length).toBeGreaterThan(0);
  });

  test('Calculates and displays Obese category', async () => {
    render(<BMICalculator />);
    const heightInput = screen.getByPlaceholderText('e.g. 170');
    const weightInput = screen.getByPlaceholderText('e.g. 65');
    const ageInput = screen.getByPlaceholderText('e.g. 25');
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI/i });

    await userEvent.type(heightInput, '170');
    await userEvent.type(weightInput, '95');
    await userEvent.type(ageInput, '25');

    await userEvent.click(calculateButton);

    const categories = screen.getAllByText('Obese');
    expect(categories.length).toBeGreaterThan(0);
  });
});
