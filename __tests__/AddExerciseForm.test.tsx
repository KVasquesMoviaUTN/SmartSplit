import { render, screen } from '@testing-library/react';
import { AddExerciseForm } from '../src/components/AddExerciseForm';
import { useWorkoutStore } from '../src/store/workoutStore';
import { act } from 'react';

// Mock the store to control unitSystem state
// Real Zustand store works in tests usually, but for isolation we can just rely on the real store since it's simple.

describe('AddExerciseForm', () => {
    beforeEach(() => {
        act(() => {
            useWorkoutStore.getState().resetWorkout();
            // Ensure we start with imperial
            if (useWorkoutStore.getState().unitSystem !== 'imperial') {
                useWorkoutStore.getState().toggleUnitSystem();
            }
        });
    });

    it('should display correct unit label based on store state', () => {
        const { rerender } = render(<AddExerciseForm />);

        // Initial state is Imperial
        expect(screen.getByText('Lbs')).toBeInTheDocument();

        // Switch to Metric
        act(() => {
            useWorkoutStore.getState().toggleUnitSystem();
        });

        // Re-render to reflect state change (Zustand hooks trigger re-render in real app)
        // In tests, we might need to rely on the component reacting to store changes.
        // render(<AddExerciseForm />) again usually works with new state if store is external.

        rerender(<AddExerciseForm />);

        expect(screen.getByText('Kg')).toBeInTheDocument();
        expect(screen.queryByText('Lbs')).not.toBeInTheDocument();
    });
});
