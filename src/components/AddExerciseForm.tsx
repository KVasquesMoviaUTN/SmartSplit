"use client";

import { useWorkoutStore } from "@/store/workoutStore";
import { getAllExercises, EXERCISE_DATABASE } from "@/lib/muscleMapping";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from "./ui/components";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export function AddExerciseForm() {
    const { addExercise, addedExercises, removeExercise, unitSystem } = useWorkoutStore();
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
        <div className="space-y-6">
            <Card className="glass-panel border-white/10 bg-white/5 backdrop-blur-md">
                <CardHeader>
                    <CardTitle>{t('addExercise')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="exercise-select">{t('exercise')}</Label>
                            <select
                                id="exercise-select"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground [&>option]:bg-background [&>option]:text-foreground"
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
                            <p className="text-xs text-muted-foreground mt-1 px-1 italic">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {t(`instruction_${selectedExercise}` as any)}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label>{t('sets')}</Label>
                                <Input type="number" min={1} value={sets} onChange={e => setSets(Number(e.target.value))} />
                            </div>

                            <div className="grid gap-2">
                                <Label>{t('reps')}</Label>
                                <Input type="number" min={1} value={reps} onChange={e => setReps(Number(e.target.value))} />
                            </div>

                            <div className="grid gap-2">
                                <Label>{unitSystem === 'metric' ? 'Kg' : 'Lbs'}</Label>
                                <Input type="number" min={0} value={weight} onChange={e => setWeight(Number(e.target.value))} />
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> {t('addToWorkout')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t('currentSession')}</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {addedExercises.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Plus className="w-6 h-6 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-foreground">{t('getStarted') || "Get started!"}</p>
                                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                    {t('addFirstExercise') || "Add your first exercise to see your muscle heatmap light up. 💪"}
                                </p>
                            </div>
                        </div>
                    )}
                    {addedExercises.map((ex) => (
                        <div key={ex.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                            <div>
                                <div className="font-medium">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {t(`exercise_${ex.exerciseName}` as any)}
                                </div>
                                <div className="text-xs text-muted-foreground">{ex.sets} x {ex.reps} @ {
                                    (() => {
                                        const def = EXERCISE_DATABASE[ex.exerciseName];
                                        if (def?.isBodyweight) {
                                            if (ex.weight === 0) return 'Bodyweight';
                                            return `Bodyweight + ${ex.weight}${unitSystem === 'metric' ? 'kg' : 'lbs'}`;
                                        }
                                        return `${ex.weight}${unitSystem === 'metric' ? 'kg' : 'lbs'}`
                                    })()
                                }</div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeExercise(ex.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
