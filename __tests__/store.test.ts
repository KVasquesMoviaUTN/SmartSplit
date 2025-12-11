import { renderHook, act } from '@testing-library/react';
import { useWorkoutStore } from '../src/store/workoutStore';

describe('WorkoutStore', () => {
    beforeEach(() => {
        const { result } = renderHook(() => useWorkoutStore());
        act(() => {
            result.current.resetWorkout();
        });
    });

    it('should add an exercise correctly', () => {
        const { result } = renderHook(() => useWorkoutStore());

        act(() => {
            result.current.addExercise({
                exerciseName: 'squat',
                sets: 3,
                reps: 10,
                weight: 225
            });
        });

        expect(result.current.addedExercises).toHaveLength(1);
        expect(result.current.addedExercises[0].exerciseName).toBe('squat');
        // Check if logic calculated stress (Heatmap should not be empty)
        expect(Object.keys(result.current.heatmap).length).toBeGreaterThan(0);
    });

    it('should toggle unit system', () => {
        const { result } = renderHook(() => useWorkoutStore());

        // Default should be imperial (lbs) per requirements
        // NOTE: unitSystem doesn't exist yet, this test is expected to fail compilation or runtime
        expect(result.current.unitSystem).toBe('imperial');

        act(() => {
            result.current.toggleUnitSystem();
        });

        expect(result.current.unitSystem).toBe('metric');

        act(() => {
            result.current.toggleUnitSystem();
        });

        expect(result.current.unitSystem).toBe('imperial');
    });
});
