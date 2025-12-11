"use client";

import { useLanguageStore } from "@/store/languageStore";
import { useMemo, useState } from "react";
import { MuscleGroup } from "@/lib/muscleMapping";
import { BACK_PATHS, FRONT_PATHS } from "@/lib/bodyPaths";
import { cn, calculateCalories, calculateDuration, calculateRecovery } from "@/lib/utils";
import { Button } from "./ui/components";
import { useUserStore } from "@/store/userStore";
import { useWorkoutStore } from "@/store/workoutStore";
import { UserProfileDialog } from "./UserProfileDialog";
import { Flame, Clock } from "lucide-react";

interface BodyHeatmapProps {
    heatmap: Record<MuscleGroup, number>;
}

// Color Utility
const getMuscleColor = (stress: number) => {
    if (!stress || stress <= 0) return "fill-muted-foreground/20 stroke-muted-foreground/30"; // Default: visible silhouette
    if (stress <= 20) return "fill-muted/40 stroke-slate-400"; // Grey (Active but low) - Distinct from empty
    if (stress <= 40) return "fill-emerald-500 stroke-emerald-600"; // Low
    if (stress <= 60) return "fill-yellow-500 stroke-yellow-600"; // Med
    if (stress <= 80) return "fill-orange-500 stroke-orange-600"; // High
    return "fill-violet-600 stroke-violet-500 animate-pulse"; // Too High
};

import { ExerciseSuggestionModal } from "./ExerciseSuggestionModal";

import { DurationSettingsDialog } from "./DurationSettingsDialog";

export function BodyHeatmap({ heatmap }: BodyHeatmapProps) {
    const [view, setView] = useState<'front' | 'back'>('front');
    const { t } = useLanguageStore();
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDurationSettingsOpen, setIsDurationSettingsOpen] = useState(false);

    // User Stats & Calories
    const userStats = useUserStore();
    const { addedExercises, durationSettings } = useWorkoutStore();

    const calories = useMemo(() => calculateCalories(userStats, addedExercises), [userStats, addedExercises]);
    const duration = useMemo(() => calculateDuration(addedExercises, durationSettings.secondsPerRep, durationSettings.secondsPerSet), [addedExercises, durationSettings]);

    const paths = view === 'front' ? FRONT_PATHS : BACK_PATHS;

    return (
        <div className="flex flex-col items-center space-y-4">
            <ExerciseSuggestionModal
                isOpen={!!selectedMuscle}
                onClose={() => setSelectedMuscle(null)}
                muscle={selectedMuscle}
            />
            <UserProfileDialog isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            {isDurationSettingsOpen && (
                <DurationSettingsDialog
                    isOpen={isDurationSettingsOpen}
                    onClose={() => setIsDurationSettingsOpen(false)}
                />
            )}

            {/* Stats Display: Calories & Duration */}
            <div className="flex gap-3">
                <div
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full cursor-pointer hover:bg-orange-500/20 transition-all"
                    onClick={() => setIsProfileOpen(true)}
                >
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    <span className="text-sm font-medium text-orange-400">
                        ≈ {calories} kcal
                    </span>
                </div>

                <div
                    className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-500/20 transition-all"
                    title={`Estimated Duration (${durationSettings.secondsPerRep}s/rep + ${durationSettings.secondsPerSet}s/rest)`}
                    onClick={() => setIsDurationSettingsOpen(true)}
                >
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-400">
                        ≈ {duration} min
                    </span>
                </div>


            </div>

            <div className="flex space-x-2">
                <Button
                    variant={view === 'front' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('front')}
                >
                    {t('front')}
                </Button>
                <Button
                    variant={view === 'back' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('back')}
                >
                    {t('back')}
                </Button>
            </div>

            <div className="relative h-[400px] w-[200px] transition-all duration-300 group">
                {/* Scanner Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-[10%] w-full animate-scan pointer-events-none z-10 opacity-50" />

                {/* SVG Content */}
                <svg viewBox="0 0 200 400" className="h-full w-full drop-shadow-2xl" role="img" aria-label={`Muscle Heatmap ${view} view`}>
                    <defs>
                        <filter id="glow-low" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="glow-high" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <title>Muscle Heatmap {view} view</title>
                    {paths.map((p) => {
                        const stress = heatmap[p.muscle as MuscleGroup] || 0;
                        const colorClass = getMuscleColor(stress);
                        const isCosmetic = ['Head', 'Neck', 'Knees'].includes(p.muscle);
                        const recoveryHours = calculateRecovery(stress);

                        // Add glow filter for active muscles
                        const filterStyle = stress > 50 ? { filter: 'url(#glow-high)' } : (stress > 0 ? { filter: 'url(#glow-low)' } : {});

                        return (
                            <path
                                key={p.id}
                                d={p.d}
                                style={filterStyle}
                                onClick={() => {
                                    console.log('Clicked muscle:', p.muscle);
                                    if (!isCosmetic) {
                                        setSelectedMuscle(p.muscle as MuscleGroup);
                                    }
                                }}
                                className={cn(
                                    "transition-all duration-500 ease-in-out stroke-[0.5]",
                                    isCosmetic ? "fill-muted/20 stroke-border cursor-default" : `${colorClass} hover:opacity-80 cursor-pointer hover:stroke-[1.5] hover:stroke-white`,
                                    selectedMuscle === p.muscle && "stroke-[2] stroke-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                )}
                            >
                                {!isCosmetic && <title>{p.muscle + ': ' + stress + ' (Recovery: ' + recoveryHours + 'h)'}</title>}
                            </path>
                        );
                    })}
                </svg>

                {/* Glossy Overlay for "Glass" effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-20 mix-blend-overlay" />
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground flex-wrap justify-center">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-full" /> {t('low')}</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-full" /> {t('med')}</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full" /> {t('high')}</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-violet-600 rounded-full" /> {t('tooHigh')}</div>
            </div>
        </div >
    );
}
