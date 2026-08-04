import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Yoga from './Yoga';

describe('Yoga Component', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test('renders yoga page with initial classes', () => {
    render(<Yoga />);

    expect(screen.getByText(/Find Your/)).toBeInTheDocument();
    expect(screen.getByText(/Inner Balance/)).toBeInTheDocument();

    // Check initial number of classes (6 classes in total)
    expect(screen.getByText('Choose from 6 classes')).toBeInTheDocument();
    expect(screen.getByText('Surya Namaskar')).toBeInTheDocument();
    expect(screen.getByText('Kundalini Yoga')).toBeInTheDocument();
  });

  test('filters classes by category', () => {
    render(<Yoga />);

    // Click 'Morning' category button
    const morningBtn = screen.getByRole('button', { name: 'Morning' });
    fireEvent.click(morningBtn);

    // Should show 1 class
    expect(screen.getByText('Choose from 1 classes')).toBeInTheDocument();
    expect(screen.getByText('Surya Namaskar')).toBeInTheDocument();
    expect(screen.queryByText('Kundalini Yoga')).not.toBeInTheDocument();
  });

  test('filters classes by level', () => {
    render(<Yoga />);

    // Click 'Beginner' level button
    const beginnerBtn = screen.getByRole('button', { name: 'Beginner' });
    fireEvent.click(beginnerBtn);

    // Should show 2 classes (Surya Namaskar, Hatha Yoga)
    expect(screen.getByText('Choose from 2 classes')).toBeInTheDocument();
    expect(screen.getByText('Surya Namaskar')).toBeInTheDocument();
    expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
    expect(screen.queryByText('Kundalini Yoga')).not.toBeInTheDocument();
  });

  test('filters classes by both category and level', () => {
    render(<Yoga />);

    // Click 'Morning' category button
    fireEvent.click(screen.getByRole('button', { name: 'Morning' }));
    // Click 'Intermediate' level button
    fireEvent.click(screen.getByRole('button', { name: 'Intermediate' }));

    // Should show 0 classes since Morning is Beginner
    expect(screen.getByText('Choose from 0 classes')).toBeInTheDocument();
    expect(screen.queryByText('Surya Namaskar')).not.toBeInTheDocument();
  });

  test('handles button clicks for navigation', () => {
    render(<Yoga />);

    // Test 'Book Live Session' button
    const bookBtn = screen.getByText('📅 Book Live Session');
    fireEvent.click(bookBtn);
    expect(window.location.href).toBe('/yoga-session');

    // Test 'My Progress' button
    const progressBtn = screen.getByText('📊 My Progress');
    fireEvent.click(progressBtn);
    expect(window.location.href).toBe('/yoga-progress');
  });
});
