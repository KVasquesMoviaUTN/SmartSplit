
import { calculateCalories } from '../src/lib/utils';
import { UserStats } from '../src/store/userStore';

describe('calculateCalories', () => {
    it('should calculate calories correctly for a standard user', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        // 10 sets => 30 mins => 0.5 hours
        // 6.0 * 75 * 0.5 = 225
        const calories = calculateCalories(stats, 10);
        expect(calories).toBe(225);
    });

    it('should return 0 for 0 sets', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        const calories = calculateCalories(stats, 0);
        expect(calories).toBe(0);
    });

    it('should adjust based on weight', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 100, // Heavier
            gender: 'male',
        };
        // 10 sets => 0.5 hours
        // 6.0 * 100 * 0.5 = 300
        const calories = calculateCalories(stats, 10);
        expect(calories).toBe(300);
    });
});
