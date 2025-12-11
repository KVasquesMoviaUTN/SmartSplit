import { getExercisesForMuscle } from '../src/lib/muscleMapping';

describe('Muscle Mapping Logic', () => {

    it('should return exercises that target a specific muscle', () => {
        // "squat" targets "Quads"
        const quadsExercises = getExercisesForMuscle('Quads');
        expect(quadsExercises.some(e => e.id === 'squat')).toBe(true);
    });

    it('should sort exercises by impact (descending)', () => {
        // Assuming we have exercises with different impacts on Glutes
        const exercises = getExercisesForMuscle('Glutes');
        if (exercises.length > 1) {
            const firstImpact = exercises[0].def.impact.find(i => i.muscle === 'Glutes')?.activation || 0;
            const secondImpact = exercises[1].def.impact.find(i => i.muscle === 'Glutes')?.activation || 0;
            expect(firstImpact).toBeGreaterThanOrEqual(secondImpact);
        }
    });

    it('should return empty list for unknown muscle', () => {
        // @ts-expect-error Testing invalid input for robustness
        const exercises = getExercisesForMuscle('NonExistentMuscle');
        expect(exercises).toEqual([]);
    });
});
