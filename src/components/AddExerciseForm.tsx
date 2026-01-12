"use client";

import { useWorkoutStore } from "@/store/workoutStore";
import { getAllExercises, EXERCISE_DATABASE } from "@/lib/muscleMapping";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from "./ui/components";
import { useState } from "react";
import { Plus, Trash2, Minus } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export function AddExerciseForm() {
    const { addExercise, updateExercise, addedExercises, removeExercise, unitSystem } = useWorkoutStore();
    const { t } = useLanguageStore();
    const options = getAllExercises();

    // Local state for form
    const [selectedExercise, setSelectedExercise] = useState(options[0]);
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState(10);
    const [weight, setWeight] = useState(135);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addExercise({
            exerciseName: selectedExercise,
            sets,
            reps,
            weight
        });
    };

    return (
        <div className="space-y-8">
            <Card className="bg-card border border-border shadow-xl overflow-hidden relative group">
                <CardHeader className="pb-4 border-b border-border">
                    <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        {t('addExercise')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-3">
                            <Label htmlFor="exercise-select" className="text-muted-foreground font-medium">{t('exercise')}</Label>
                            <div className="relative">
                                <select
                                    id="exercise-select"
                                    className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary hover:border-primary/50 text-foreground [&>option]:bg-background [&>option]:text-foreground appearance-none cursor-pointer"
                                    value={selectedExercise}
                                    onChange={(e) => setSelectedExercise(e.target.value)}
                                >
                                    {options.map(opt => (
                                        <option key={opt} value={opt}>
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {t(`exercise_${opt}` as any)}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground/80 px-1 italic flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-primary/50" />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {t(`instruction_${selectedExercise}` as any)}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t('sets')}</Label>
                                <Input type="number" min={1} value={sets} onChange={e => setSets(Number(e.target.value))} className="h-12 text-lg font-semibold text-center" />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-muted-foreground text-xs uppercase tracking-wider">{t('reps')}</Label>
                                <Input type="number" min={1} value={reps} onChange={e => setReps(Number(e.target.value))} className="h-12 text-lg font-semibold text-center" />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-muted-foreground text-xs uppercase tracking-wider">{unitSystem === 'metric' ? 'Kg' : 'Lbs'}</Label>
                                <Input type="number" min={0} value={weight} onChange={e => setWeight(Number(e.target.value))} className="h-12 text-lg font-semibold text-center" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:scale-[1.02] active:scale-[0.98]">
                                <Plus className="mr-2 h-5 w-5" /> {t('addToWorkout')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1 flex items-center gap-2">
                    {t('currentSession')}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-foreground">{addedExercises.length}</span>
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {addedExercises.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 border-2 border-dashed border-border rounded-2xl bg-card/50">
                            <div className="p-4 bg-primary/10 rounded-full ring-4 ring-primary/5">
                                <Plus className="w-8 h-8 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <p className="font-bold text-foreground text-lg">{t('getStarted') || "Get started!"}</p>
                                <p className="text-sm text-muted-foreground max-w-[220px] mx-auto leading-relaxed">
                                    {t('addFirstExercise') || "Add your first exercise to see your muscle heatmap light up. 💪"}
                                </p>
                            </div>
                        </div>
                    )}
                    {addedExercises.map((ex) => (
                        <div key={ex.id} className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Sets Control */}
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={() => updateExercise(ex.id, { sets: ex.sets + 1 })}
                                        className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                    <div className="h-8 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                                        {ex.sets}
                                    </div>
                                    <button
                                        onClick={() => ex.sets > 1 && updateExercise(ex.id, { sets: ex.sets - 1 })}
                                        className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors disabled:opacity-30"
                                        disabled={ex.sets <= 1}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="flex-1">
                                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {t(`exercise_${ex.exerciseName}` as any)}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md">
                                            <button
                                                onClick={() => ex.reps > 1 && updateExercise(ex.id, { reps: ex.reps - 1 })}
                                                className="hover:text-primary transition-colors disabled:opacity-30"
                                                disabled={ex.reps <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span>{ex.reps} reps</span>
                                            <button
                                                onClick={() => updateExercise(ex.id, { reps: ex.reps + 1 })}
                                                className="hover:text-primary transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>
                                            {(() => {
                                                const def = EXERCISE_DATABASE[ex.exerciseName];
                                                if (def?.isBodyweight) {
                                                    if (ex.weight === 0) return 'Bodyweight';
                                                    return `BW + ${ex.weight}${unitSystem === 'metric' ? 'kg' : 'lbs'}`;
                                                }
                                                return `${ex.weight}${unitSystem === 'metric' ? 'kg' : 'lbs'}`
                                            })()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeExercise(ex.id)} className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
