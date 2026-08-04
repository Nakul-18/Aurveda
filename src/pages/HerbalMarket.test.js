import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HerbalMarket from './HerbalMarket';

describe('HerbalMarket Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the main hero title and tag', () => {
    render(<HerbalMarket />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('HerbalMarketplace');
    expect(screen.getByText('🌿 Ayurvedic Store')).toBeInTheDocument();
  });

  test('renders initial list of products', () => {
    render(<HerbalMarket />);
    expect(screen.getByText('अश्वगंधा मुळाची पावडर')).toBeInTheDocument();
    expect(screen.getByText('त्रिफळा चूर्ण')).toBeInTheDocument();
    expect(screen.getByText(/Showing 8 products/i)).toBeInTheDocument();
  });

  test('filters products by category', () => {
    render(<HerbalMarket />);
    const digestionBtn = screen.getByRole('button', { name: 'Digestion' });
    fireEvent.click(digestionBtn);

    expect(screen.getByText(/Showing 0 products/i)).toBeInTheDocument();
    expect(screen.queryByText('त्रिफळा चूर्ण')).not.toBeInTheDocument();
  });

  test('filters products by search input', () => {
    render(<HerbalMarket />);
    const searchInput = screen.getByPlaceholderText(/Search products\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'त्रिफळा' } });

    expect(screen.getByText(/Showing 1 products/i)).toBeInTheDocument();
    expect(screen.getByText('त्रिफळा चूर्ण')).toBeInTheDocument();
    expect(screen.queryByText('अश्वगंधा मुळाची पावडर')).not.toBeInTheDocument();
  });

  test('adds product to cart and updates UI', () => {
    render(<HerbalMarket />);

    expect(screen.queryByText('1')).not.toBeInTheDocument();

    const addBtns = screen.getAllByRole('button', { name: '+ Add' });

    fireEvent.click(addBtns[0]);

    // Check cart count updated
    const cartCount = screen.getByText('1');
    expect(cartCount).toHaveClass('cart-count');

    // Check added button UI changed
    expect(screen.getByText('✓ Added!')).toBeInTheDocument();

    // Fast-forward timers to see if it resets
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('✓ Added!')).not.toBeInTheDocument();
  });
});
