import { create } from 'zustand';
import { EXERCISE_DATABASE, MuscleGroup } from '@/lib/muscleMapping';

export interface WorkoutSet {
    id: string; // Unique ID for list rendering
    exerciseName: string;
    sets: number;
    reps: number;
    weight: number;
}

interface WorkoutState {
    addedExercises: WorkoutSet[];
    heatmap: Record<MuscleGroup, number>; // Current stress (0-infinity, visualized usually capped at 20-30 for RED)
    totalSystemStress: number;
    unitSystem: 'imperial' | 'metric';
    durationSettings: {
        secondsPerRep: number;
        secondsPerSet: number;
    };

    addExercise: (exercise: Omit<WorkoutSet, 'id'>) => void;
    removeExercise: (id: string) => void;
    resetWorkout: () => void;
    toggleUnitSystem: () => void;
    updateDurationSettings: (settings: { secondsPerRep: number; secondsPerSet: number }) => void;
}

// Helper to recalculate stress
const calculateStress = (exercises: WorkoutSet[]) => {
    const newHeatmap: Record<string, number> = {};
    let totalScale = 0;

    exercises.forEach((ex) => {
        const def = EXERCISE_DATABASE[ex.exerciseName];
        if (!def) return;

        // Logic: Stress = Sets * Activation Score (0-10)
        // Example: 10 sets of an exercise with activation 10 = 100 stress (Max)

        const volumeMultiplier = ex.sets;

        def.impact.forEach((imp) => {
            const current = newHeatmap[imp.muscle] || 0;
            // Add 1 unit per focus score per set
            const added = imp.activation * volumeMultiplier;
            newHeatmap[imp.muscle] = current + added;
            totalScale += added;
        });
    });

    return { heatmap: newHeatmap as Record<MuscleGroup, number>, total: totalScale };
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
    addedExercises: [],
    heatmap: {} as Record<MuscleGroup, number>,
    totalSystemStress: 0,
    unitSystem: 'imperial',
    durationSettings: {
        secondsPerRep: 6,
        secondsPerSet: 120,
    },

    addExercise: (exercise) => {
        const newEx = { ...exercise, id: crypto.randomUUID() };
        const currentExercises = [...get().addedExercises, newEx];
        const { heatmap, total } = calculateStress(currentExercises);

        set({
            addedExercises: currentExercises,
            heatmap,
            totalSystemStress: total,
        });
    },

    removeExercise: (id) => {
        const currentExercises = get().addedExercises.filter(e => e.id !== id);
        const { heatmap, total } = calculateStress(currentExercises);
        set({
            addedExercises: currentExercises,
            heatmap,
            totalSystemStress: total,
        });
    },

    resetWorkout: () => set({ addedExercises: [], heatmap: {} as Record<MuscleGroup, number>, totalSystemStress: 0 }),

    toggleUnitSystem: () => set((state) => ({ unitSystem: state.unitSystem === 'imperial' ? 'metric' : 'imperial' })),
    updateDurationSettings: (settings: { secondsPerRep: number; secondsPerSet: number }) => set({ durationSettings: settings }),
}));
