import { render, screen, fireEvent } from '@testing-library/react';
import MedTourism from './MedTourism';

describe('MedTourism Cost Estimator', () => {
  it('calculates the estimate correctly when days and people are provided', () => {
    render(<MedTourism />);

    // Find inputs
    const daysInput = screen.getByPlaceholderText('Number of days');
    const peopleInput = screen.getByPlaceholderText('Number of people');
    const calculateButton = screen.getByText('Calculate Estimate');

    // Set values (e.g. 5 days, 2 people -> 3000 * 5 * 2 = 30000)
    fireEvent.change(daysInput, { target: { value: '5' } });
    fireEvent.change(peopleInput, { target: { value: '2' } });

    // Trigger calculation
    fireEvent.click(calculateButton);

    // Check if correct estimate is displayed
    const estimateResult = screen.getByText('₹30,000');
    expect(estimateResult).toBeInTheDocument();
  });

  it('does not calculate estimate when required fields are missing', () => {
    render(<MedTourism />);

    // Find inputs
    const daysInput = screen.getByPlaceholderText('Number of days');
    const calculateButton = screen.getByText('Calculate Estimate');

    // Set only days value
    fireEvent.change(daysInput, { target: { value: '5' } });

    // Trigger calculation
    fireEvent.click(calculateButton);

    // Check that estimate result section is not rendered
    const estimateTitle = screen.queryByText('Estimated Cost');
    expect(estimateTitle).not.toBeInTheDocument();
  });
});
