import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Yoga from './Yoga';

// Mock react-router-dom as it's required according to the provided memory
jest.mock('react-router-dom', () => ({

  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

describe('Yoga Component Filtering', () => {
  beforeEach(() => {
    // Reset any mocks if necessary before each test
    jest.clearAllMocks();
  });

  test('renders all classes initially', () => {
    render(<Yoga />);
    // Check if all 6 classes from the initial data are rendered
    const classCards = screen.getAllByText(/Surya Namaskar|Pranayama|Hatha Yoga|Vinyasa Flow|Yin Yoga|Kundalini Yoga/i);
    expect(classCards.length).toBeGreaterThanOrEqual(6); // Checking some names

    // We can count `.class-card` elements or check the subtext
    expect(screen.getByText('Choose from 6 classes')).toBeInTheDocument();
  });

  test('filters classes by category "Morning"', () => {
    render(<Yoga />);

    // Find the 'Morning' category filter button
    const morningFilter = screen.getByRole('button', { name: 'Morning' });
    fireEvent.click(morningFilter);

    // Expecting 1 class for 'Morning' (Surya Namaskar)
    expect(screen.getByText('Choose from 1 classes')).toBeInTheDocument();
    expect(screen.getByText('Surya Namaskar')).toBeInTheDocument();
    expect(screen.queryByText('Pranayama')).not.toBeInTheDocument();
  });

  test('filters classes by level "Beginner"', () => {
    render(<Yoga />);

    // Find the 'Beginner' level filter button
    const beginnerFilter = screen.getByRole('button', { name: 'Beginner' });
    fireEvent.click(beginnerFilter);

    // Expecting 2 classes for 'Beginner' (Surya Namaskar, Hatha Yoga)
    expect(screen.getByText('Choose from 2 classes')).toBeInTheDocument();
    expect(screen.getByText('Surya Namaskar')).toBeInTheDocument();
    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
    expect(screen.queryByText('Kundalini Yoga')).not.toBeInTheDocument(); // Advanced
  });

  test('filters classes by combined category and level', () => {
    render(<Yoga />);

    // Click 'Classic' category
    const classicFilter = screen.getByRole('button', { name: 'Classic' });
    fireEvent.click(classicFilter);

    // Click 'Beginner' level
    const beginnerFilter = screen.getByRole('button', { name: 'Beginner' });
    fireEvent.click(beginnerFilter);

    // Expecting 1 class (Hatha Yoga)
    expect(screen.getByText('Choose from 1 classes')).toBeInTheDocument();
    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
  });

  test('handles edge cases where no classes match the filter', () => {
    render(<Yoga />);

    // Click 'Morning' category
    const morningFilter = screen.getByRole('button', { name: 'Morning' });
    fireEvent.click(morningFilter);

    // Click 'Advanced' level
    const advancedFilter = screen.getByRole('button', { name: 'Advanced' });
    fireEvent.click(advancedFilter);

    // Expecting 0 classes
    expect(screen.getByText('Choose from 0 classes')).toBeInTheDocument();
    expect(screen.queryByText('Surya Namaskar')).not.toBeInTheDocument();
    expect(screen.queryByText('Kundalini Yoga')).not.toBeInTheDocument();
  });

  test('resets filters back to "All" and "All Levels"', () => {
    render(<Yoga />);

    // Apply filters
    fireEvent.click(screen.getByRole('button', { name: 'Flow' }));
    fireEvent.click(screen.getByRole('button', { name: 'Intermediate' }));

    expect(screen.getByText('Choose from 1 classes')).toBeInTheDocument();

    // Reset filters
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    fireEvent.click(screen.getByRole('button', { name: 'All Levels' }));

    // Should show all 6 classes again
    expect(screen.getByText('Choose from 6 classes')).toBeInTheDocument();
  });
});
