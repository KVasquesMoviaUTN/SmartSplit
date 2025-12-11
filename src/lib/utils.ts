import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserStats } from "@/store/userStore";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calculateCalories(stats: UserStats, totalSets: number): number {
    // 1 Set = approx 3 minutes (active + rest)
    const durationMin = totalSets * 3;
    const durationHours = durationMin / 60;

    // MET for resistance training = 6.0
    const MET = 6.0;

    // Formula: Calories = MET * Weight(kg) * Duration(hours)
    // Detailed MET formula: kcal = (MET * 3.5 * weight(kg) / 200) * duration(min)
    // Let's use the standard MET * weight * hours for simplicity and convention
    // But (MET * 3.5 * weight / 200) * min matches: 
    //   (6 * 3.5 * 75 / 200) * 60 = 0.105 * 75 * 60 = 472
    //   6 * 75 * 1 = 450. Close enough.

    return Math.round(MET * stats.weight * durationHours);
}

export function calculateDuration(exercises: { sets: number; reps: number }[]): number {
    if (!exercises.length) return 0;

    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
    const totalReps = exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps), 0);

    const timeFromRepsSeconds = totalReps * 6; // 6 seconds per rep
    const timeFromSetsSeconds = totalSets * 2 * 60; // 2 minutes rest per set (120s)

    const totalSeconds = timeFromRepsSeconds + timeFromSetsSeconds;
    return Math.round(totalSeconds / 60); // Return in minutes
}

export function calculateRecovery(stress: number): number {
    if (!stress || stress <= 0) return 0; // Grey
    if (stress < 40) return 24; // Green (approx 1-4 sets)
    if (stress < 80) return 48; // Yellow (approx 4-8 sets)
    return 72; // Red (8+ sets)
}
