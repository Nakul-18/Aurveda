import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Doctors from './Doctors';

// Mock matchMedia if needed by any inner dependencies (though not used in Doctors directly, sometimes good to have)
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Doctors Component', () => {
  beforeEach(() => {
    // Reset global fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockDoctor = {
    id: 1,
    name: 'Dr. John Doe',
    specialization: 'Panchakarma Specialist',
    experience: '10 years',
    language: 'English',
    rating: 4.8,
    fee: 500,
    available: true
  };

  test('renders loading state initially', async () => {
    // Return a promise that never resolves to keep it in loading state
    global.fetch.mockImplementation(() => new Promise(() => {}));

    render(<Doctors />);

    expect(screen.getByText(/Loading doctors from database.../i)).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    global.fetch.mockImplementation(() => Promise.reject(new Error('Network error')));

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load doctors/i)).toBeInTheDocument();
      expect(screen.getByText(/Cannot connect to server. Make sure backend is running on port 5000!/i)).toBeInTheDocument();
    });
  });

  test('renders doctors list when fetch is successful', async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, doctors: [mockDoctor] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
    });

    // Check specific fields
    expect(screen.getAllByText('Panchakarma Specialist')[0]).toBeInTheDocument();
    expect(screen.getByText('10 years')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.8')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('🟢 Available')).toBeInTheDocument();
  });

  test('handles filtering by specialization', async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, doctors: [mockDoctor] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/doctors?');
    });

    const filterButton = screen.getByText('Panchakarma Specialist', { selector: 'button.filter-pill' });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/doctors?specialization=Panchakarma Specialist&');
    });
  });

  test('handles "Available Today" toggle', async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, doctors: [mockDoctor] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/doctors?');
    });

    // Click the toggle container (as checking the input triggers onChange which is empty)
    const toggleContainer = screen.getByText('Available Today');
    fireEvent.click(toggleContainer);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/doctors?available=true&');
    });
  });

  test('handles search input filtering locally', async () => {
    const doctor2 = {
      ...mockDoctor,
      id: 2,
      name: 'Dr. Jane Smith',
      specialization: 'Yoga & Naturopathy'
    };

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, doctors: [mockDoctor, doctor2] })
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
      expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('🔍 Search by name or specialization...');
    fireEvent.change(searchInput, { target: { value: 'Jane' } });

    expect(screen.queryByText('Dr. John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
  });

});
