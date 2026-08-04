import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SymptomChecker from './SymptomChecker';

describe('SymptomChecker', () => {
  test('renders hero title and symptoms list correctly', () => {
    render(<SymptomChecker />);

    // Check for hero elements
    expect(screen.getByText('🔍 Symptom Checker')).toBeInTheDocument();

    // Find Your Ayurvedic Remedy text is split with a span, testing library getByText with simple exact match
    // we can use a regex for simpler check
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Find YourAyurvedic Remedy/i);

    // Check for a few symptoms to ensure the list renders
    expect(screen.getByRole('button', { name: 'Headache' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fatigue' })).toBeInTheDocument();
  });

  test('selecting and deselecting symptoms updates UI', async () => {
    render(<SymptomChecker />);

    const headacheBtn = screen.getByRole('button', { name: 'Headache' });

    // Initially not selected
    expect(headacheBtn).not.toHaveClass('selected');
    expect(headacheBtn).not.toHaveTextContent('✓');

    // Select
    userEvent.click(headacheBtn);
    expect(headacheBtn).toHaveClass('selected');
    expect(headacheBtn).toHaveTextContent('✓ Headache');

    // Deselect
    userEvent.click(headacheBtn);
    expect(headacheBtn).not.toHaveClass('selected');
    expect(headacheBtn).not.toHaveTextContent('✓');
    expect(headacheBtn).toHaveTextContent('Headache');
  });

  test('check button disabled initially, enabled on selection, text changes', async () => {
    render(<SymptomChecker />);

    const checkBtn = screen.getByRole('button', { name: /Select at least one symptom/i });
    expect(checkBtn).toBeDisabled();

    // Select one symptom
    userEvent.click(screen.getByRole('button', { name: 'Fatigue' }));

    expect(checkBtn).toBeEnabled();
    expect(checkBtn).toHaveTextContent('Check Remedies for 1 symptom →');

    // Select another
    userEvent.click(screen.getByRole('button', { name: 'Anxiety' }));
    expect(checkBtn).toHaveTextContent('Check Remedies for 2 symptoms →');
  });

  test('clicking check displays remedies, selecting/deselecting clears results', async () => {
    render(<SymptomChecker />);

    const headacheBtn = screen.getByRole('button', { name: 'Headache' });
    userEvent.click(headacheBtn);

    const checkBtn = screen.getByRole('button', { name: /Check Remedies for 1 symptom/i });
    userEvent.click(checkBtn);

    // Results should be displayed
    expect(screen.getByText('Dosha: Pitta')).toBeInTheDocument();
    expect(screen.getByText('💡 Apply coconut oil on forehead. Drink brahmi tea. Avoid spicy food.')).toBeInTheDocument();

    // Now toggle the symptom
    userEvent.click(headacheBtn);

    // Results should be cleared
    expect(screen.queryByText('Dosha: Pitta')).not.toBeInTheDocument();
    expect(screen.queryByText('💡 Apply coconut oil on forehead. Drink brahmi tea. Avoid spicy food.')).not.toBeInTheDocument();
  });
});
