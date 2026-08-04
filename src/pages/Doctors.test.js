import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Doctors from './Doctors';

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Arjun',
    spec: 'Panchakarma Specialist',
    available: true,
    experience: '15 years',
    language: 'English, Hindi',
    rating: 4.8,
    fee: 800
  },
  {
    id: 2,
    name: 'Dr. Priya',
    spec: 'Ayurvedic Physician',
    available: false,
    experience: '8 years',
    language: 'English',
    rating: 4.5,
    fee: 500
  },
  {
    id: 3,
    name: 'Dr. Sharma',
    spec: 'Yoga & Naturopathy',
    available: true,
    experience: '12 years',
    language: 'Hindi',
    rating: 4.9,
    fee: 600
  }
];

describe('Doctors Component', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    global.fetch = jest.fn();
    delete window.location;
    window.location = { href: '' };
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.location = originalLocation;
  });

  test('renders loading state initially', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, doctors: [] })
    });
    render(<Doctors />);
    expect(screen.getByText(/Loading doctors from database.../i)).toBeInTheDocument();
  });

  test('renders error state on fetch failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load doctors/i)).toBeInTheDocument();
    });
  });

  test('renders doctors and filters by search text', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, doctors: mockDoctors })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
      expect(screen.getByText('Dr. Priya')).toBeInTheDocument();
      expect(screen.getByText('Dr. Sharma')).toBeInTheDocument();
    });

    // Search by name
    const searchInput = screen.getByPlaceholderText(/Search by name or specialization/i);
    fireEvent.change(searchInput, { target: { value: 'Priya' } });

    expect(screen.queryByText('Dr. Arjun')).not.toBeInTheDocument();
    expect(screen.getByText('Dr. Priya')).toBeInTheDocument();

    // Search by specialization
    fireEvent.change(searchInput, { target: { value: 'Yoga' } });
    expect(screen.queryByText('Dr. Priya')).not.toBeInTheDocument();
    expect(screen.getByText('Dr. Sharma')).toBeInTheDocument();
  });

  test('filters doctors when specialization filter is clicked', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: mockDoctors })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
      expect(screen.getByText('Dr. Priya')).toBeInTheDocument();
      expect(screen.getByText('Dr. Sharma')).toBeInTheDocument();
    });

    const specButton = screen.getByRole('button', { name: 'Panchakarma Specialist' });
    fireEvent.click(specButton);

    expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Priya')).not.toBeInTheDocument();
    expect(screen.queryByText('Dr. Sharma')).not.toBeInTheDocument();
  });

  test('filters doctors when available only toggle is clicked', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: mockDoctors })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
      expect(screen.getByText('Dr. Priya')).toBeInTheDocument();
      expect(screen.getByText('Dr. Sharma')).toBeInTheDocument();
    });

    const availToggle = screen.getByText(/Available Today/i);
    fireEvent.click(availToggle);

    expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Priya')).not.toBeInTheDocument();
    expect(screen.getByText('Dr. Sharma')).toBeInTheDocument();
  });

  test('navigates to booking page on booking button click if available', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: [mockDoctors[0]] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Arjun')).toBeInTheDocument();
    });

    const bookBtn = screen.getByText('📅 Book Consultation');
    fireEvent.click(bookBtn);

    expect(window.location.href).toContain('/booking?doctor=1');
  });

  test('does not navigate when booking unavailabe doctor', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: [mockDoctors[1]] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Priya')).toBeInTheDocument();
    });

    const bookBtn = screen.getByText('Not Available');
    fireEvent.click(bookBtn);

    expect(window.location.href).not.toContain('/booking');
  });
});
