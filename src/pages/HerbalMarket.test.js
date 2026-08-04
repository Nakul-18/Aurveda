import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HerbalMarket from './HerbalMarket';

describe('HerbalMarket Component - getBadgeClass functionality', () => {
  it('renders Bestseller badge correctly', () => {
    render(<HerbalMarket />);
    // "सर्वाधिक विक्री" should map to 'badge-bestseller'
    const bestSellerBadges = screen.getAllByText('सर्वाधिक विक्री');
    expect(bestSellerBadges.length).toBeGreaterThan(0);
    expect(bestSellerBadges[0]).toHaveClass('badge-bestseller');
  });

  it('renders Popular badge correctly', () => {
    render(<HerbalMarket />);
    // "लोकप्रिय" should map to 'badge-popular'
    const popularBadges = screen.getAllByText('लोकप्रिय');
    expect(popularBadges.length).toBeGreaterThan(0);
    expect(popularBadges[0]).toHaveClass('badge-popular');
  });

  it('renders New badge correctly', () => {
    render(<HerbalMarket />);
    // "नवीन" should map to 'badge-new'
    const newBadges = screen.getAllByText('नवीन');
    expect(newBadges.length).toBeGreaterThan(0);
    expect(newBadges[0]).toHaveClass('badge-new');
  });

  it('renders Top Rated badge correctly', () => {
    render(<HerbalMarket />);
    // "उच्च दर्जा" should map to 'badge-toprated'
    const topRatedBadges = screen.getAllByText('उच्च दर्जा');
    expect(topRatedBadges.length).toBeGreaterThan(0);
    expect(topRatedBadges[0]).toHaveClass('badge-toprated');
  });

  it('does not render badge class if product has no badge', () => {
    render(<HerbalMarket />);
    // "कडुनिंब गोळ्या" has badge: null
    const noBadgeProduct = screen.getByText('कडुनिंब गोळ्या').closest('.product-card');
    const badgeElement = noBadgeProduct.querySelector('.product-badge');
    expect(badgeElement).toBeNull();
  });
});
