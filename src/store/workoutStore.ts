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

    addExercise: (exercise: Omit<WorkoutSet, 'id'>) => void;
    removeExercise: (id: string) => void;
    resetWorkout: () => void;
    toggleUnitSystem: () => void;
}

// Helper to recalculate stress
const calculateStress = (exercises: WorkoutSet[]) => {
    const newHeatmap: Record<string, number> = {};
    let totalScale = 0;

    exercises.forEach((ex) => {
        const def = EXERCISE_DATABASE[ex.exerciseName];
        if (!def) return;

        // Logic: Stress = Sets * Reps * BaseImpact * (Weight factor? Ignored for simplicity now, or just treated as volume)
        // Simplified Logic: Stress = Sets * (BaseImpact)
        // User Requirement: "If user adds Deadlift, add +8 stress to Hamstrings..."
        // We multiply by Sets to make it accumulate. 1 Set of Deadlift = +8. 3 Sets = +24.

        // NOTE: For better visualization, we might want to dampen it or use a log scale, 
        // but linear accumulation per set is physically reasonable for "volume load".

        const volumeMultiplier = ex.sets;

        def.impact.forEach((imp) => {
            const current = newHeatmap[imp.muscle] || 0;
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
}));
