
import { calculateRecovery } from '../src/lib/utils';

describe('calculateRecovery', () => {
    it('should return 24h for low stress', () => {
        expect(calculateRecovery(10)).toBe(24);
        expect(calculateRecovery(39)).toBe(24);
    });

    it('should return 48h for medium stress', () => {
        expect(calculateRecovery(40)).toBe(48);
        expect(calculateRecovery(79)).toBe(48);
    });

    it('should return 72h for high stress', () => {
        expect(calculateRecovery(80)).toBe(72);
        expect(calculateRecovery(100)).toBe(72);
    });
});
