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
    metValue?: number; // Metabolic Equivalent of Task (approx intensity)
    isBodyweight?: boolean;
    category?: 'push_horizontal' | 'push_vertical' | 'pull_vertical' | 'pull_horizontal' | 'legs_squat' | 'legs_hinge' | 'legs_isolation' | 'isolation_arms' | 'core';
}

export const EXERCISE_DATABASE: Record<string, ExerciseDef> = {
    bench_press: {
        impact: [
            { muscle: 'Pecs', activation: 10 },
            { muscle: 'Triceps', activation: 7 },
            { muscle: 'FrontDelts', activation: 8 },
        ],
        metValue: 6.0,
    },


    squat: {
        impact: [
            { muscle: 'Quads', activation: 10 },
            { muscle: 'Glutes', activation: 8 },
            { muscle: 'LowerBack', activation: 6 },
            { muscle: 'Hamstrings', activation: 5 },
        ],
        metValue: 8.0,
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
        metValue: 8.0,
    },

    pull_up: {
        impact: [
            { muscle: 'Lats', activation: 10 },
            { muscle: 'Biceps', activation: 7 },
            { muscle: 'Traps', activation: 5 },
            { muscle: 'Forearms', activation: 5 },
            { muscle: 'RearDelts', activation: 6 },
        ],
        metValue: 6.0,
        isBodyweight: true,
    },
    overhead_press: {
        impact: [
            { muscle: 'FrontDelts', activation: 10 },
            { muscle: 'SideDelts', activation: 8 },
            { muscle: 'Triceps', activation: 6 },
            { muscle: 'Traps', activation: 4 },
        ],
        metValue: 6.0,
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
        metValue: 6.0,
    },
    lateral_raise: {
        impact: [
            { muscle: 'SideDelts', activation: 10 },
            { muscle: 'Traps', activation: 4 },
        ],
        metValue: 3.5,
    },
    reverse_fly: {
        impact: [
            { muscle: 'RearDelts', activation: 10 },
            { muscle: 'Traps', activation: 5 },
        ],
        metValue: 3.5,
    },
    dumbbell_curl: {
        impact: [
            { muscle: 'Biceps', activation: 10 },
            { muscle: 'Forearms', activation: 4 },
        ],
        metValue: 3.5,
    },
    tricep_extension: {
        impact: [
            { muscle: 'Triceps', activation: 10 },
        ],
        metValue: 3.5,
    },
    leg_curl: {
        impact: [
            { muscle: 'Hamstrings', activation: 10 },
        ],
        metValue: 4.0,
    },
    leg_extension: {
        impact: [
            { muscle: 'Quads', activation: 10 },
        ],
        metValue: 4.0,
    },
    crunch: {
        impact: [
            { muscle: 'Abs', activation: 10 },
        ],
        metValue: 3.5,
        isBodyweight: true,
    },
    side_plank: {
        impact: [
            { muscle: 'Obliques', activation: 9 },
            { muscle: 'Abs', activation: 5 },
        ],
        metValue: 4.0,
        isBodyweight: true,
    },
    push_up: {
        impact: [
            { muscle: 'Pecs', activation: 8 },
            { muscle: 'FrontDelts', activation: 6 },
            { muscle: 'Triceps', activation: 5 },
            { muscle: 'Abs', activation: 4 },
        ],
        metValue: 5.0,
        isBodyweight: true,
        category: 'push_horizontal',
    },
    incline_bench_press: {
        impact: [
            { muscle: 'Pecs', activation: 9 }, // Upper Chest bias
            { muscle: 'FrontDelts', activation: 8 },
            { muscle: 'Triceps', activation: 7 },
        ],
        metValue: 6.0,
    },
    dip: {
        impact: [
            { muscle: 'Triceps', activation: 9 },
            { muscle: 'Pecs', activation: 7 },
            { muscle: 'FrontDelts', activation: 6 },
        ],
        metValue: 6.0,
        isBodyweight: true,
    },
    lat_pulldown: {
        impact: [
            { muscle: 'Lats', activation: 9 },
            { muscle: 'Biceps', activation: 6 },
            { muscle: 'RearDelts', activation: 5 },
            { muscle: 'Forearms', activation: 5 },
        ],
        metValue: 5.0,
        category: 'pull_vertical',
    },
    face_pull: {
        impact: [
            { muscle: 'RearDelts', activation: 9 },
            { muscle: 'Traps', activation: 8 },
            { muscle: 'SideDelts', activation: 5 },
        ],
        metValue: 4.0,
    },
    lunge: {
        impact: [
            { muscle: 'Quads', activation: 8 },
            { muscle: 'Glutes', activation: 8 },
            { muscle: 'Hamstrings', activation: 6 },
            { muscle: 'Calves', activation: 4 },
        ],
        metValue: 7.0,
        isBodyweight: true,
        category: 'legs_squat',
    },
    calf_raise: {
        impact: [
            { muscle: 'Calves', activation: 10 },
        ],
        metValue: 3.5,
        isBodyweight: true,
    },
    hammer_curl: {
        impact: [
            { muscle: 'Biceps', activation: 8 },
            { muscle: 'Forearms', activation: 7 },
        ],
        metValue: 3.5,
    },
    skull_crusher: {
        impact: [
            { muscle: 'Triceps', activation: 10 },
        ],
        metValue: 3.5,
    },
    plank: {
        impact: [
            { muscle: 'Abs', activation: 9 },
            { muscle: 'Obliques', activation: 6 },
            { muscle: 'FrontDelts', activation: 4 },
        ],
        metValue: 4.0,
        isBodyweight: true,
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

export const MUSCLE_RECOVERY_CONFIG: Record<MuscleGroup, { baseHours: number; stressFactor: number }> = {
    // Large Muscles (Legs/Back) - Slower Recovery
    Quads: { baseHours: 48, stressFactor: 0.5 },
    Hamstrings: { baseHours: 48, stressFactor: 0.5 },
    Glutes: { baseHours: 48, stressFactor: 0.5 },
    Lats: { baseHours: 36, stressFactor: 0.4 },
    LowerBack: { baseHours: 48, stressFactor: 0.6 }, // Very slow recovery

    // Major Upper Body - Moderate Recovery
    Pecs: { baseHours: 36, stressFactor: 0.4 },
    FrontDelts: { baseHours: 24, stressFactor: 0.3 },
    Traps: { baseHours: 24, stressFactor: 0.3 },

    // Smaller/Accessory - Faster Recovery
    SideDelts: { baseHours: 24, stressFactor: 0.25 },
    RearDelts: { baseHours: 24, stressFactor: 0.25 },
    Triceps: { baseHours: 24, stressFactor: 0.25 },
    Biceps: { baseHours: 24, stressFactor: 0.25 },
    Forearms: { baseHours: 12, stressFactor: 0.2 },
    
    // Resilient Muscles - Very Fast Recovery
    Abs: { baseHours: 12, stressFactor: 0.2 },
    Obliques: { baseHours: 12, stressFactor: 0.2 },
    Calves: { baseHours: 12, stressFactor: 0.2 },
};
