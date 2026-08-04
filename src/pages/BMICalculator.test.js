import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BMICalculator from './BMICalculator';

describe('BMICalculator', () => {
  it('calculates BMI correctly for Normal Weight', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '65' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('22.5')).toBeInTheDocument();
    // Use a regular expression or function if multiple texts exist, or target the specific element
    expect(screen.getAllByText('Normal Weight')[0]).toBeInTheDocument();
  });

  it('calculates BMI correctly for Underweight', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('17.3')).toBeInTheDocument();
    expect(screen.getAllByText('Underweight')[0]).toBeInTheDocument();
  });

  it('calculates BMI correctly for Overweight', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '80' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('27.7')).toBeInTheDocument();
    expect(screen.getAllByText('Overweight')[0]).toBeInTheDocument();
  });

  it('calculates BMI correctly for Obese', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '170' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('34.6')).toBeInTheDocument();
    expect(screen.getAllByText('Obese')[0]).toBeInTheDocument();
  });

  it('handles zero height resulting in Infinity', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '65' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('Infinity')).toBeInTheDocument();
  });

  it('handles zero height and zero weight resulting in NaN', () => {
    render(<BMICalculator />);
    fireEvent.change(screen.getByPlaceholderText('e.g. 170'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 65'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. 25'), { target: { value: '25' } });
    fireEvent.click(screen.getByText('Calculate BMI →'));
    expect(screen.getByText('NaN')).toBeInTheDocument();
  });
});
