import { render, screen, fireEvent } from '@testing-library/react';
import BMICalculator from './BMICalculator';

describe('BMICalculator Component', () => {
  test('renders the calculator form correctly', () => {
    render(<BMICalculator />);
    expect(screen.getByText(/BMI Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Height \(cm\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight \(kg\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Age \(years\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate BMI →/i })).toBeInTheDocument();
  });

  test('button is disabled initially and enabled when all inputs are filled', () => {
    render(<BMICalculator />);
    const calculateButton = screen.getByRole('button', { name: /Calculate BMI →/i });
    expect(calculateButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 170/i), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 65/i), { target: { value: '65' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 25/i), { target: { value: '25' } });

    expect(calculateButton).not.toBeDisabled();
  });

  test('calculates correct BMI and displays result for Underweight category', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 170/i), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 65/i), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 25/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate BMI →/i }));

    expect(screen.getByText('17.3')).toBeInTheDocument();
    const elements = screen.getAllByText('Underweight');
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Vata imbalance likely/i)).toBeInTheDocument();
  });

  test('calculates correct BMI and displays result for Normal Weight category', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 170/i), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 65/i), { target: { value: '65' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 25/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate BMI →/i }));

    expect(screen.getByText('22.5')).toBeInTheDocument();
    const elements = screen.getAllByText('Normal Weight');
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Doshas are balanced/i)).toBeInTheDocument();
  });

  test('calculates correct BMI and displays result for Overweight category', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 170/i), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 65/i), { target: { value: '80' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 25/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate BMI →/i }));

    expect(screen.getByText('27.7')).toBeInTheDocument();
    const elements = screen.getAllByText('Overweight');
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Kapha imbalance likely/i)).toBeInTheDocument();
  });

  test('calculates correct BMI and displays result for Obese category', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 170/i), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 65/i), { target: { value: '95' } });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 25/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate BMI →/i }));

    expect(screen.getByText('32.9')).toBeInTheDocument();
    const elements = screen.getAllByText('Obese');
    expect(elements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Severe Kapha imbalance/i)).toBeInTheDocument();
  });
});
