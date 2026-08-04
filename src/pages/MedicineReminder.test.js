import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedicineReminder from './MedicineReminder';

// Mock react-router-dom to prevent module resolution errors as per memory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

describe('MedicineReminder Component', () => {
  test('renders the Medicine Reminder header and subheader', () => {
    render(<MedicineReminder />);

    // Check for the header texts
    expect(screen.getByText(/Never Miss/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Dose/i)).toBeInTheDocument();
  });

  test('renders initial medicines and their details', () => {
    render(<MedicineReminder />);

    // Check for medicine names (using getAllByText because it might appear in the main list and "Next Reminder")
    expect(screen.getAllByText('Ashwagandha')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Triphala Churna')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Brahmi Capsules')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Chyawanprash')[0]).toBeInTheDocument();

    // Check for initial taken count
    expect(screen.getByText('2 of 4 medicines taken today')).toBeInTheDocument();
  });

  test('toggles medicine taken status when check button is clicked', () => {
    render(<MedicineReminder />);

    // Initial state: 2 of 4 taken
    expect(screen.getByText('2 of 4 medicines taken today')).toBeInTheDocument();

    // Find all check buttons
    // We know Triphala Churna is not taken initially and is the second medicine
    const checkButtons = document.querySelectorAll('.check-btn');

    // Triphala Churna is the second item (index 1) and is untaken, so its button shouldn't have '✓' text content yet
    const untakenBtn = checkButtons[1];
    expect(untakenBtn).not.toHaveClass('checked');
    expect(untakenBtn.textContent).not.toContain('✓');

    // Click the button
    fireEvent.click(untakenBtn);

    // Verify the count updated
    expect(screen.getByText('3 of 4 medicines taken today')).toBeInTheDocument();

    // Verify the button now has the 'checked' class and '✓'
    expect(untakenBtn).toHaveClass('checked');
    expect(untakenBtn.textContent).toContain('✓');

    // Click again to untoggle
    fireEvent.click(untakenBtn);
    expect(screen.getByText('2 of 4 medicines taken today')).toBeInTheDocument();
  });
});
