import { render, screen, fireEvent } from '@testing-library/react';
import MedicineReminder from './MedicineReminder';

describe('MedicineReminder', () => {
  it('toggles the taken status of a medicine when the check button is clicked', () => {
    render(<MedicineReminder />);

    // Use getAllByText as the text appears multiple times (main list + next reminder)
    const medicineNames = screen.getAllByText('Triphala Churna');
    const medicineName = medicineNames[0]; // The first one is in the main list
    const medicineCard = medicineName.closest('.med-card');
    const checkBtn = medicineCard.querySelector('.check-btn');

    expect(checkBtn).not.toHaveClass('checked');
    expect(medicineName).not.toHaveClass('strike');
    expect(medicineCard).not.toHaveClass('taken');

    fireEvent.click(checkBtn);

    expect(checkBtn).toHaveClass('checked');
    expect(medicineName).toHaveClass('strike');
    expect(medicineCard).toHaveClass('taken');

    fireEvent.click(checkBtn);

    expect(checkBtn).not.toHaveClass('checked');
    expect(medicineName).not.toHaveClass('strike');
    expect(medicineCard).not.toHaveClass('taken');
  });
});
