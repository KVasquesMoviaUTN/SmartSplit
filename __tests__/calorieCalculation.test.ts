
import { calculateCalories } from '../src/lib/utils';
import { UserStats } from '../src/store/userStore';

describe('calculateCalories', () => {
    it('should calculate calories correctly for a standard user (Male, 25, 175cm, 75kg)', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        // BMR = (10*75) + (6.25*175) - (5*25) + 5 = 1723.75
        // Hourly = 71.82
        // Bench (MET 6.0) * 0.5 hr * 71.82 = 215.47 => 215
        const exercises = [{ exerciseName: 'bench_press', sets: 10 }];
        const calories = calculateCalories(stats, exercises);
        expect(calories).toBe(215);
    });

    it('should calculate higher calories for high intensity (Squat MET 8.0)', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        // Hourly = 71.82
        // Squat (MET 8.0) * 0.5 * 71.82 = 287.29 => 287
        const exercises = [{ exerciseName: 'squat', sets: 10 }];
        const calories = calculateCalories(stats, exercises);
        expect(calories).toBe(287);
    });

    it('should calculate lower calories for isolation (Curls MET 3.5)', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        // Hourly = 71.82
        // Curl (MET 3.5) * 0.5 * 71.82 = 125.69 => 126
        const exercises = [{ exerciseName: 'dumbbell_curl', sets: 10 }];
        const calories = calculateCalories(stats, exercises);
        expect(calories).toBe(126);
    });

    it('should calculate differently for female (Gender Impacy)', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'female',
        };
        // BMR = (10*75) + (6.25*175) - (5*25) - 161 = 1557.75
        // Hourly = 64.90
        // Bench (MET 6.0) * 0.5 * 64.90 = 194.7 => 195
        const exercises = [{ exerciseName: 'bench_press', sets: 10 }];
        const calories = calculateCalories(stats, exercises);
        expect(calories).toBe(195);
    });

    it('should return 0 for 0 sets', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
        };
        const calories = calculateCalories(stats, []);
        expect(calories).toBe(0);
    });

    it('should adjust based on weight', () => {
        const stats: UserStats = {
            age: 25,
            height: 175,
            weight: 100, // Heavier
            gender: 'male',
        };
        // BMR = (10*100) + (6.25*175) - (5*25) + 5 = 1973.75
        // Hourly = 82.23
        // Bench (MET 6.0) * 0.5 * 82.23 = 246.7 => 247
        // (Old formula was 300)
        const exercises = [{ exerciseName: 'bench_press', sets: 10 }];
        const calories = calculateCalories(stats, exercises);
        expect(calories).toBe(247);
    });
});
