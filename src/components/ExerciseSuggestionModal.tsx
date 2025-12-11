"use client";

import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MuscleGroup, getExercisesForMuscle } from "@/lib/muscleMapping";
import { useLanguageStore } from "@/store/languageStore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkoutStore } from "@/store/workoutStore";
import { Button } from "./ui/components";
import { Plus } from "lucide-react";
import { getIconForExercise } from "@/lib/exerciseIcons";

interface ExerciseSuggestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    muscle: MuscleGroup | null;
}

export function ExerciseSuggestionModal({ isOpen, onClose, muscle }: ExerciseSuggestionModalProps) {
    const { t } = useLanguageStore();
    const { addExercise } = useWorkoutStore();

    const exercises = useMemo(() => {
        if (!muscle) return [];
        return getExercisesForMuscle(muscle);
    }, [muscle]);

    const handleAdd = (name: string) => {
        addExercise({
            exerciseName: name,
            sets: 1,
            reps: 10,
            weight: 0 // Default, user can edit
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-panel border-white/10 bg-white/10 backdrop-blur-xl text-foreground max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <span className="text-primary">{muscle || 'Select Muscle'}</span> {t('suggestions')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('bestExercisesFor')} {muscle || '...'}.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4 mt-2">
                        {exercises.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">{t('noExercisesFound')}</p>
                        ) : (
                            exercises.map((ex) => {
                                const impact = muscle ? (ex.def.impact.find(i => i.muscle === muscle)?.activation || 0) : 0;
                                return (
                                    <div key={ex.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-black/20 hover:bg-black/30 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
                                                {getIconForExercise(ex.id)}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="font-medium">{ex.id}</div>
                                                <div className="flex gap-2 text-xs">
                                                    <Badge variant="secondary" className={impact >= 8 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                                                        Impact: {impact}/10
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" onClick={() => handleAdd(ex.id)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
