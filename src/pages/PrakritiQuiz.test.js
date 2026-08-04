import { getPrakriti } from './PrakritiQuiz';

describe('getPrakriti tie-breaking logic', () => {
  it('should return "vata" for a 3-way tie', () => {
    const scores = { vata: 5, pitta: 5, kapha: 5 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('should return "vata" when vata and pitta tie for first', () => {
    const scores = { vata: 5, pitta: 5, kapha: 2 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('should return "vata" when vata and kapha tie for first', () => {
    const scores = { vata: 5, pitta: 2, kapha: 5 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('should return "pitta" when pitta and kapha tie for first', () => {
    const scores = { vata: 2, pitta: 5, kapha: 5 };
    expect(getPrakriti(scores)).toBe('pitta');
  });

  it('should return "pitta" when pitta is distinct highest', () => {
    const scores = { vata: 2, pitta: 8, kapha: 3 };
    expect(getPrakriti(scores)).toBe('pitta');
  });

  it('should return "kapha" when kapha is distinct highest', () => {
    const scores = { vata: 1, pitta: 3, kapha: 6 };
    expect(getPrakriti(scores)).toBe('kapha');
  });
});
