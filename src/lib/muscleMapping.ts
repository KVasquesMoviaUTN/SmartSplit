export type MuscleGroup =
    | 'Pecs'
    | 'Lats'
    | 'Quads'
    | 'Hamstrings'
    | 'FrontDelts'
    | 'SideDelts'
    | 'RearDelts'
    | 'Triceps'
    | 'Biceps'
    | 'Forearms'
    | 'Abs'
    | 'Obliques'
    | 'Traps'
    | 'Glutes'
    | 'Calves'
    | 'LowerBack';

export interface MuscleImpact {
    muscle: MuscleGroup;
    activation: number; // 0 to 10
}

export interface ExerciseDef {
    impact: MuscleImpact[];
}

export const EXERCISE_DATABASE: Record<string, ExerciseDef> = {
    bench_press: {
        impact: [
            { muscle: 'Pecs', activation: 10 },
            { muscle: 'Triceps', activation: 7 },
            { muscle: 'FrontDelts', activation: 8 },
        ],
    },
    squat: {
        impact: [
            { muscle: 'Quads', activation: 10 },
            { muscle: 'Glutes', activation: 8 },
            { muscle: 'LowerBack', activation: 6 },
            { muscle: 'Hamstrings', activation: 5 },
        ],
    },
    deadlift: {
        impact: [
            { muscle: 'LowerBack', activation: 9 },
            { muscle: 'Hamstrings', activation: 9 },
            { muscle: 'Glutes', activation: 8 },
            { muscle: 'Forearms', activation: 7 },
            { muscle: 'Traps', activation: 6 },
            { muscle: 'Lats', activation: 5 },
            { muscle: 'RearDelts', activation: 4 },
        ],
    },
    pull_up: {
        impact: [
            { muscle: 'Lats', activation: 10 },
            { muscle: 'Biceps', activation: 7 },
            { muscle: 'Traps', activation: 5 },
            { muscle: 'Forearms', activation: 5 },
            { muscle: 'RearDelts', activation: 6 },
        ],
    },
    overhead_press: {
        impact: [
            { muscle: 'FrontDelts', activation: 10 },
            { muscle: 'SideDelts', activation: 8 },
            { muscle: 'Triceps', activation: 6 },
            { muscle: 'Traps', activation: 4 },
        ],
    },
    barbell_row: {
        impact: [
            { muscle: 'Lats', activation: 8 },
            { muscle: 'Traps', activation: 7 },
            { muscle: 'RearDelts', activation: 8 },
            { muscle: 'Biceps', activation: 6 },
            { muscle: 'LowerBack', activation: 5 },
            { muscle: 'Forearms', activation: 5 },
        ],
    },
    lateral_raise: {
        impact: [
            { muscle: 'SideDelts', activation: 10 },
            { muscle: 'Traps', activation: 4 },
        ],
    },
    reverse_fly: {
        impact: [
            { muscle: 'RearDelts', activation: 10 },
            { muscle: 'Traps', activation: 5 },
        ],
    },
    dumbbell_curl: {
        impact: [
            { muscle: 'Biceps', activation: 10 },
            { muscle: 'Forearms', activation: 4 },
        ],
    },
    tricep_extension: {
        impact: [
            { muscle: 'Triceps', activation: 10 },
        ],
    },
    leg_curl: {
        impact: [
            { muscle: 'Hamstrings', activation: 10 },
        ],
    },
    leg_extension: {
        impact: [
            { muscle: 'Quads', activation: 10 },
        ],
    },
    crunch: {
        impact: [
            { muscle: 'Abs', activation: 10 },
        ],
    },
    side_plank: {
        impact: [
            { muscle: 'Obliques', activation: 9 },
            { muscle: 'Abs', activation: 5 },
        ],
    },
    push_up: {
        impact: [
            { muscle: 'Pecs', activation: 8 },
            { muscle: 'FrontDelts', activation: 6 },
            { muscle: 'Triceps', activation: 5 },
            { muscle: 'Abs', activation: 4 },
        ],
    },
    incline_bench_press: {
        impact: [
            { muscle: 'Pecs', activation: 9 }, // Upper Chest bias
            { muscle: 'FrontDelts', activation: 8 },
            { muscle: 'Triceps', activation: 7 },
        ],
    },
    dip: {
        impact: [
            { muscle: 'Triceps', activation: 9 },
            { muscle: 'Pecs', activation: 7 },
            { muscle: 'FrontDelts', activation: 6 },
        ],
    },
    lat_pulldown: {
        impact: [
            { muscle: 'Lats', activation: 9 },
            { muscle: 'Biceps', activation: 6 },
            { muscle: 'RearDelts', activation: 5 },
            { muscle: 'Forearms', activation: 5 },
        ],
    },
    face_pull: {
        impact: [
            { muscle: 'RearDelts', activation: 9 },
            { muscle: 'Traps', activation: 8 },
            { muscle: 'SideDelts', activation: 5 },
        ],
    },
    lunge: {
        impact: [
            { muscle: 'Quads', activation: 8 },
            { muscle: 'Glutes', activation: 8 },
            { muscle: 'Hamstrings', activation: 6 },
            { muscle: 'Calves', activation: 4 },
        ],
    },
    calf_raise: {
        impact: [
            { muscle: 'Calves', activation: 10 },
        ],
    },
    hammer_curl: {
        impact: [
            { muscle: 'Biceps', activation: 8 },
            { muscle: 'Forearms', activation: 7 },
        ],
    },
    skull_crusher: {
        impact: [
            { muscle: 'Triceps', activation: 10 },
        ],
    },
    plank: {
        impact: [
            { muscle: 'Abs', activation: 9 },
            { muscle: 'Obliques', activation: 6 },
            { muscle: 'FrontDelts', activation: 4 },
        ],
    },
};

// Helper to get all exercise IDs
export const getAllExercises = (): string[] => {
    return Object.keys(EXERCISE_DATABASE);
};

// Helper to get exercises for a specific muscle, sorted by impact
export const getExercisesForMuscle = (muscle: MuscleGroup): { id: string, def: ExerciseDef }[] => {
    const exercises: { id: string, def: ExerciseDef }[] = [];

    for (const [id, def] of Object.entries(EXERCISE_DATABASE)) {
        const muscleImpact = def.impact.find(mi => mi.muscle === muscle);
        if (muscleImpact && muscleImpact.activation > 0) {
            exercises.push({ id, def });
        }
    }

    // Sort by impact on the specific muscle (descending)
    return exercises.sort((a, b) => {
        const impactA = a.def.impact.find(mi => mi.muscle === muscle)?.activation || 0;
        const impactB = b.def.impact.find(mi => mi.muscle === muscle)?.activation || 0;
        return impactB - impactA;
    });
};
