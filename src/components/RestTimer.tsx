"use client";

import { useWorkoutStore } from "@/store/workoutStore";
import { useEffect } from "react";
import { X, Play, Pause, SkipForward, Plus } from "lucide-react";
import { Button } from "./ui/components";
import { cn } from "@/lib/utils";

export function RestTimer() {
	const { timerStatus, timerSeconds, decrementTimer, stopTimer, startTimer } = useWorkoutStore();

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (timerStatus === 'running' && timerSeconds > 0) {
			interval = setInterval(() => {
				decrementTimer();
			}, 1000);
		} else if (timerSeconds === 0 && timerStatus === 'running') {
			stopTimer();
			// Optional: Play a sound here
		}
		return () => clearInterval(interval);
	}, [timerStatus, timerSeconds, decrementTimer, stopTimer]);

	if (timerStatus === 'idle') return null;

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	};

	return (
		<div className={cn(
			"fixed bottom-24 right-4 z-50 flex items-center gap-3 p-2 pl-4 rounded-full bg-card border border-border shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in",
			timerSeconds <= 10 && "border-red-500/50 shadow-red-500/20"
		)}>
			<div className="flex flex-col">
				<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Rest</span>
				<span className={cn("text-xl font-mono font-bold tabular-nums leading-none", timerSeconds <= 10 ? "text-red-500" : "text-foreground")}>
					{formatTime(timerSeconds)}
				</span>
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
					onClick={() => startTimer(timerSeconds + 30)}
				>
					<Plus className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
					onClick={stopTimer}
				>
					<X className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}
