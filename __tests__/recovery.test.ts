
import { calculateRecovery } from '../src/lib/utils';

describe('calculateRecovery', () => {
    it('should return 12h for very low stress (active grey)', () => {
        expect(calculateRecovery(10)).toBe(12);
        expect(calculateRecovery(20)).toBe(12);
    });

    it('should return 24h for low stress', () => {
        expect(calculateRecovery(21)).toBe(24);
        expect(calculateRecovery(40)).toBe(24);
    });

    it('should return 48h for medium stress', () => {
        expect(calculateRecovery(41)).toBe(48);
        expect(calculateRecovery(60)).toBe(48);
    });

    it('should return 72h for high stress', () => {
        expect(calculateRecovery(61)).toBe(72);
        expect(calculateRecovery(80)).toBe(72);
    });

    it('should return 96h for too high stress', () => {
        expect(calculateRecovery(81)).toBe(96);
        expect(calculateRecovery(100)).toBe(96);
    });
});
