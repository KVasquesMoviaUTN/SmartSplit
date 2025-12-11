
import { calculateDuration } from '../src/lib/utils';

describe('calculateDuration', () => {
    it('should calculate duration correctly for 1 exercise', () => {
        // 3 sets, 10 reps each
        // Reps time: 3*10*6s = 180s = 3m
        // Rest time: 3*2m = 6m
        // Total: 9m
        const exercises = [{ sets: 3, reps: 10 }];
        expect(calculateDuration(exercises)).toBe(9);
    });

    it('should calculate duration correctly for 0 sets', () => {
        expect(calculateDuration([])).toBe(0);
    });

    it('should sum duration for multiple exercises', () => {
        // Ex 1: 3x10 => 9m
        // Ex 2: 3x10 => 9m
        // Total: 18m
        const exercises = [
            { sets: 3, reps: 10 },
            { sets: 3, reps: 10 }
        ];
        expect(calculateDuration(exercises)).toBe(18);
    });

    it('should calculate duration with custom settings', () => {
        // 3 sets, 10 reps
        // Custom: 2s per rep, 60s per set
        // Reps time: 3*10*2s = 60s = 1m
        // Rest time: 3*60s = 180s = 3m
        // Total: 4m
        const exercises = [{ sets: 3, reps: 10 }];
        expect(calculateDuration(exercises, 2, 60)).toBe(4);
    });
});
