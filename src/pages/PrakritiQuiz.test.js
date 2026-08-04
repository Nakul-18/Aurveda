import { getPrakriti } from './PrakritiQuiz';

describe('getPrakriti', () => {
  it('returns "vata" when vata is the highest score', () => {
    const scores = { vata: 5, pitta: 3, kapha: 2 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('returns "pitta" when pitta is the highest score', () => {
    const scores = { vata: 2, pitta: 6, kapha: 2 };
    expect(getPrakriti(scores)).toBe('pitta');
  });

  it('returns "kapha" when kapha is the highest score', () => {
    const scores = { vata: 1, pitta: 2, kapha: 7 };
    expect(getPrakriti(scores)).toBe('kapha');
  });

  it('returns "vata" when vata ties with pitta', () => {
    const scores = { vata: 4, pitta: 4, kapha: 2 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('returns "vata" when vata ties with kapha', () => {
    const scores = { vata: 4, pitta: 2, kapha: 4 };
    expect(getPrakriti(scores)).toBe('vata');
  });

  it('returns "pitta" when pitta ties with kapha', () => {
    const scores = { vata: 2, pitta: 4, kapha: 4 };
    expect(getPrakriti(scores)).toBe('pitta');
  });

  it('returns "vata" when all scores are tied', () => {
    const scores = { vata: 3, pitta: 3, kapha: 3 };
    expect(getPrakriti(scores)).toBe('vata');
  });
});
