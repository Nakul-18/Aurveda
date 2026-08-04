import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import YogaProgress from './YogaProgress';

describe('YogaProgress Component', () => {
  it('correctly calculates and applies the maxMin height for the bar chart', () => {
    const { container } = render(<YogaProgress />);

    // Query all the bars in the chart
    const bars = container.querySelectorAll('.bar');

    // Make sure we have 7 bars (one for each day)
    expect(bars.length).toBe(7);

    // Test Monday (index 0): 45 minutes
    // (45 / 75) * 100 = 60
    expect(bars[0]).toHaveStyle({ height: '60px' });

    // Test Thursday (index 3): 0 minutes
    // Fallback height is 4px
    expect(bars[3]).toHaveStyle({ height: '4px' });

    // Test Saturday (index 5): 75 minutes (Max)
    // (75 / 75) * 100 = 100
    expect(bars[5]).toHaveStyle({ height: '100px' });
  });
});
