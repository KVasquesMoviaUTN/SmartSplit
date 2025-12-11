import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserStats } from "@/store/userStore";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import { EXERCISE_DATABASE } from "./muscleMapping";

// Helper to calculate BMR via Mifflin-St Jeor Equation
export function calculateBMR(stats: UserStats): number {
    // Men: (10 × weight) + (6.25 × height) - (5 × age) + 5
    // Women: (10 × weight) + (6.25 × height) - (5 × age) - 161
    let bmr = (10 * stats.weight) + (6.25 * stats.height) - (5 * stats.age);

    if (stats.gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }
    return bmr;
}

export function calculateCalories(stats: UserStats, exercises: { exerciseName: string; sets: number }[]): number {
    const bmr = calculateBMR(stats);
    // BMR is daily calories. Get hourly burn rate.
    const bmrHourly = bmr / 24;

    let totalCalories = 0;

    exercises.forEach(ex => {
        const def = EXERCISE_DATABASE[ex.exerciseName];
        // Default MET 6.0 if not defined
        const met = def?.metValue || 6.0;

        // 1 Set = approx 3 minutes (active + rest)
        // Duration in hours for this exercise
        const durationHours = (ex.sets * 3) / 60;

        // Calories = MET * Hourly BMR * Duration
        totalCalories += met * bmrHourly * durationHours;
    });

    return Math.round(totalCalories);
}

export function calculateDuration(
    exercises: { sets: number; reps: number }[],
    secondsPerRep = 6,
    secondsPerSet = 120
): number {
    if (!exercises.length) return 0;

    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
    const totalReps = exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps), 0);

    const timeFromRepsSeconds = totalReps * secondsPerRep;
    const timeFromSetsSeconds = totalSets * secondsPerSet;

    const totalSeconds = timeFromRepsSeconds + timeFromSetsSeconds;
    return Math.round(totalSeconds / 60); // Return in minutes
}

export function calculateRecovery(stress: number): number {
    if (stress <= 20) return 12; // Grey (Very Low/Warmup)
    if (stress <= 40) return 24; // Green (Low)
    if (stress <= 60) return 48; // Yellow (Med)
    if (stress <= 80) return 72; // Orange (High)
    return 96; // Purple (Too High)
}
