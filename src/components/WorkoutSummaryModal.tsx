"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/components";
import { useWorkoutStore } from "@/store/workoutStore";
import { useLanguageStore } from "@/store/languageStore";
import { Trophy, Dumbbell, Flame, Target } from "lucide-react";
import { EXERCISE_DATABASE } from "@/lib/muscleMapping";
import { useMemo } from "react";
import confetti from 'canvas-confetti';

interface WorkoutSummaryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function WorkoutSummaryModal({ isOpen, onClose }: WorkoutSummaryModalProps) {
	const { addedExercises, resetWorkout, unitSystem } = useWorkoutStore();
	const { t } = useLanguageStore();

	const stats = useMemo(() => {
		if (!isOpen) return null;

		let totalVolume = 0;
		let totalSets = 0;
		let totalReps = 0;
		const muscleFocus: Record<string, number> = {};

		addedExercises.forEach(ex => {
			totalSets += ex.sets;
			totalReps += ex.sets * ex.reps;
			totalVolume += ex.weight * ex.sets * ex.reps;

			const def = EXERCISE_DATABASE[ex.exerciseName];
			if (def) {
				def.impact.forEach(imp => {
					muscleFocus[imp.muscle] = (muscleFocus[imp.muscle] || 0) + (imp.activation * ex.sets);
				});
			}
		});

		const topMuscle = Object.entries(muscleFocus).sort((a, b) => b[1] - a[1])[0];

		return {
			totalVolume,
			totalSets,
			totalReps,
			primaryFocus: topMuscle ? topMuscle[0] : 'General'
		};
	}, [addedExercises, isOpen]);

	const handleFinish = () => {
		resetWorkout();
		onClose();
	};

	// Trigger confetti on open
	if (isOpen) {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		});
	}

	if (!stats) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md bg-card border-border">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
						<Trophy className="w-6 h-6 text-yellow-500" />
						{t('workoutComplete') || "Workout Complete!"}
					</DialogTitle>
					<DialogDescription>
						{t('greatJob') || "Great job! Here's what you accomplished today:"}
					</DialogDescription>
				</DialogHeader>

				<div className="grid grid-cols-2 gap-4 py-4">
					<div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center text-center gap-2">
						<Dumbbell className="w-6 h-6 text-primary" />
						<div>
							<div className="text-2xl font-bold text-foreground">
								{stats.totalVolume.toLocaleString()} <span className="text-xs text-muted-foreground">{unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
							</div>
							<div className="text-xs text-muted-foreground uppercase tracking-wider">Total Volume</div>
						</div>
					</div>

					<div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center text-center gap-2">
						<Target className="w-6 h-6 text-orange-500" />
						<div>
							<div className="text-xl font-bold text-foreground truncate max-w-[120px]">
								{stats.primaryFocus}
							</div>
							<div className="text-xs text-muted-foreground uppercase tracking-wider">Primary Focus</div>
						</div>
					</div>

					<div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center text-center gap-2">
						<div className="text-2xl font-bold text-foreground">{stats.totalSets}</div>
						<div className="text-xs text-muted-foreground uppercase tracking-wider">Total Sets</div>
					</div>

					<div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-center gap-2">
						<div className="text-2xl font-bold text-foreground">{stats.totalReps}</div>
						<div className="text-xs text-muted-foreground uppercase tracking-wider">Total Reps</div>
					</div>
				</div>

				<DialogFooter>
					<Button onClick={handleFinish} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg">
						{t('finishSession') || "Finish Session"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
