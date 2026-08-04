import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedTourism from './MedTourism';

// Mock react-router-dom to prevent module resolution errors
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

describe('MedTourism Component', () => {
  test('renders main elements correctly', () => {
    render(<MedTourism />);

    // Hero title
    expect(screen.getByText(/Wellness Travel/i)).toBeInTheDocument();

    // Search input
    expect(screen.getByPlaceholderText('🔍 Search by hospital name or city...')).toBeInTheDocument();

    // Default hospital list (checking for at least one known hospital)
    expect(screen.getByText('KIMS Ayurveda Hospital')).toBeInTheDocument();

    // Cost estimator section
    expect(screen.getByText('💰 Cost Estimator')).toBeInTheDocument();
  });

  test('filters hospitals based on search input (hospital name)', () => {
    render(<MedTourism />);

    const searchInput = screen.getByPlaceholderText('🔍 Search by hospital name or city...');

    // Initially, both should be present
    expect(screen.getByText('KIMS Ayurveda Hospital')).toBeInTheDocument();
    expect(screen.getByText('Patanjali Wellness Center')).toBeInTheDocument();

    // Search for specific hospital
    fireEvent.change(searchInput, { target: { value: 'Patanjali' } });

    // Patanjali should be present, KIMS should not
    expect(screen.getByText('Patanjali Wellness Center')).toBeInTheDocument();
    expect(screen.queryByText('KIMS Ayurveda Hospital')).not.toBeInTheDocument();
  });

  test('filters hospitals based on search input (city)', () => {
    render(<MedTourism />);

    const searchInput = screen.getByPlaceholderText('🔍 Search by hospital name or city...');

    // Search for specific city
    fireEvent.change(searchInput, { target: { value: 'Rishikesh' } });

    // Patanjali (in Rishikesh) should be present, KIMS (in Kerala) should not
    expect(screen.getByText('Patanjali Wellness Center')).toBeInTheDocument();
    expect(screen.queryByText('KIMS Ayurveda Hospital')).not.toBeInTheDocument();
  });

  test('calculates cost estimate correctly', () => {
    render(<MedTourism />);

    const daysInput = screen.getByPlaceholderText('Number of days');
    const peopleInput = screen.getByPlaceholderText('Number of people');
    const calculateBtn = screen.getByText('Calculate Estimate');

    // Set inputs
    fireEvent.change(daysInput, { target: { value: '5' } });
    fireEvent.change(peopleInput, { target: { value: '2' } });

    // Calculate
    fireEvent.click(calculateBtn);

    // Base cost is 3000 * days * people -> 3000 * 5 * 2 = 30000
    // The format is with locale string: ₹30,000
    expect(screen.getByText('Estimated Cost')).toBeInTheDocument();
    expect(screen.getByText('₹30,000')).toBeInTheDocument();
  });

  test('prevents calculation if days or people inputs are missing', () => {
    render(<MedTourism />);

    const daysInput = screen.getByPlaceholderText('Number of days');
    const calculateBtn = screen.getByText('Calculate Estimate');

    // Only set days, leave people empty
    fireEvent.change(daysInput, { target: { value: '5' } });

    // Calculate
    fireEvent.click(calculateBtn);

    // Estimated Cost shouldn't be rendered because calculation aborted
    expect(screen.queryByText('Estimated Cost')).not.toBeInTheDocument();
  });
});
