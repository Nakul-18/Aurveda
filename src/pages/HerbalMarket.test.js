import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HerbalMarket from './HerbalMarket';

describe('HerbalMarket Component Filtering', () => {
  it('renders all products initially', () => {
    render(<HerbalMarket />);
    // There are 8 products in the array, verify they are all rendered.
    expect(screen.getByText('अश्वगंधा मुळाची पावडर')).toBeInTheDocument();
    expect(screen.getByText('त्रिफळा चूर्ण')).toBeInTheDocument();
    expect(screen.getByText('ब्राह्मी कॅप्सूल')).toBeInTheDocument();
    expect(screen.getByText('कडुनिंब गोळ्या')).toBeInTheDocument();
    expect(screen.getByText('हळद + काळी मिरी')).toBeInTheDocument();
    expect(screen.getByText('च्यवनप्राश')).toBeInTheDocument();
    expect(screen.getByText('शतावरी पावडर')).toBeInTheDocument();
    expect(screen.getByText('गिलोय रस')).toBeInTheDocument();

    expect(screen.getByText('Showing 8 products')).toBeInTheDocument();
  });

  it('filters products by search input', () => {
    render(<HerbalMarket />);

    const searchInput = screen.getByPlaceholderText('🔍 Search products...');
    fireEvent.change(searchInput, { target: { value: 'च्यवनप्राश' } });

    expect(screen.getByText('च्यवनप्राश')).toBeInTheDocument();
    // Some other product shouldn't be there
    expect(screen.queryByText('अश्वगंधा मुळाची पावडर')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 products')).toBeInTheDocument();
  });

  it('filters products by category selection', () => {
    render(<HerbalMarket />);

    const categoryButton = screen.getByRole('button', { name: 'पचन' });
    fireEvent.click(categoryButton);

    expect(screen.getByText('त्रिफळा चूर्ण')).toBeInTheDocument();
    // Other category products shouldn't be there
    expect(screen.queryByText('अश्वगंधा मुळाची पावडर')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 products')).toBeInTheDocument();
  });

  it('filters products by both search and category together', () => {
    render(<HerbalMarket />);

    // Select category that has multiple products (रोगप्रतिकारक शक्ती)
    const categoryButton = screen.getByRole('button', { name: 'रोगप्रतिकारक शक्ती' });
    fireEvent.click(categoryButton);

    // Initial check in category (should have 3)
    expect(screen.getByText('Showing 3 products')).toBeInTheDocument();
    expect(screen.getByText('हळद + काळी मिरी')).toBeInTheDocument();
    expect(screen.getByText('च्यवनप्राश')).toBeInTheDocument();
    expect(screen.getByText('गिलोय रस')).toBeInTheDocument();

    // Now search for "गिलोय"
    const searchInput = screen.getByPlaceholderText('🔍 Search products...');
    fireEvent.change(searchInput, { target: { value: 'गिलोय' } });

    expect(screen.getByText('गिलोय रस')).toBeInTheDocument();
    expect(screen.queryByText('च्यवनप्राश')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 products')).toBeInTheDocument();
  });

  it('displays empty state when no products match', () => {
    render(<HerbalMarket />);

    const searchInput = screen.getByPlaceholderText('🔍 Search products...');
    fireEvent.change(searchInput, { target: { value: 'nonexistentproduct' } });

    expect(screen.queryByText('अश्वगंधा मुळाची पावडर')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 0 products')).toBeInTheDocument();
  });
});
