import { render, screen, fireEvent } from '@testing-library/react';
import MedicineReminder from './MedicineReminder';

describe('MedicineReminder', () => {
  it('toggles the taken status of a medicine when the check button is clicked', () => {
    render(<MedicineReminder />);

    // Find the specific card containing the medicine
    // We can target the card by text, then scope our queries to it
    const medicineName = screen.getAllByText('Triphala Churna')[0]; // Main list

    // eslint-disable-next-line testing-library/no-node-access
    const medicineCard = medicineName.closest('.med-card');
    // eslint-disable-next-line testing-library/no-node-access
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
