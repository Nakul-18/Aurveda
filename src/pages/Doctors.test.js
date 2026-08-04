import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Doctors from './Doctors';

// Mock react-router-dom as mentioned in guidelines
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}), { virtual: true });

describe('Doctors Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Ayurveda',
      specialization: 'Panchakarma Specialist',
      available: true,
      experience: '10 years',
      language: 'English, Hindi',
      rating: 4.8,
      fee: 500
    },
    {
      id: 2,
      name: 'Dr. Yoga',
      specialization: 'Yoga & Naturopathy',
      available: false,
      experience: '5 years',
      language: 'English',
      rating: 4.5,
      fee: 300
    }
  ];

  it('renders loading state initially', async () => {
    // Unresolved promise to keep it loading
    global.fetch.mockImplementation(() => new Promise(() => {}));

    render(<Doctors />);
    expect(screen.getByText(/Loading doctors from database/i)).toBeInTheDocument();
  });

  it('renders doctors on successful fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, doctors: mockDoctors }),
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Ayurveda')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Dr. Yoga')).toBeInTheDocument();
    });

    expect(screen.getByText('Showing 2 doctors')).toBeInTheDocument();
  });

  it('renders error state on API failure (success: false)', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load doctors')).toBeInTheDocument();
    });
  });

  it('renders error state on network failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText(/Cannot connect to server/i)).toBeInTheDocument();
    });
  });

  it('renders empty state if no doctors found', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, doctors: [] }),
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('No doctors found')).toBeInTheDocument();
    });
  });

  it('filters doctors based on search input', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, doctors: mockDoctors }),
    });

    render(<Doctors />);

    await waitFor(() => {
      expect(screen.getByText('Dr. Ayurveda')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Dr. Yoga')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by name or specialization/i);
    fireEvent.change(searchInput, { target: { value: 'Ayurveda' } });

    expect(screen.getByText('Dr. Ayurveda')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Yoga')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 doctors')).toBeInTheDocument();
  });

  it('fetches again when specialization is changed', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: mockDoctors }),
    });

    render(<Doctors />);
    await waitFor(() => {
      expect(screen.getByText('Dr. Ayurveda')).toBeInTheDocument();
    });

    // Initial fetch
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:5000/api/doctors?'));

    const specButtons = screen.getAllByText('Yoga & Naturopathy');
    // We want the filter pill button, not the doctor card's specialization text.
    // Given the component structure, the first one is the filter button.
    const specButton = specButtons.find(el => el.tagName === 'BUTTON');
    fireEvent.click(specButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('specialization=Yoga & Naturopathy'));
    });
  });

  it('fetches again when available only is toggled', async () => {
    global.fetch.mockResolvedValue({
      json: async () => ({ success: true, doctors: mockDoctors }),
    });

    render(<Doctors />);
    await waitFor(() => {
      expect(screen.getByText('Dr. Ayurveda')).toBeInTheDocument();
    });

    const availToggle = screen.getByText('Available Today');
    fireEvent.click(availToggle);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('available=true'));
    });
  });
});
