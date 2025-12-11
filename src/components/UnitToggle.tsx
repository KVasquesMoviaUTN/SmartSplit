"use client";

import { useWorkoutStore } from "@/store/workoutStore";
import { Button } from "./ui/components";

export function UnitToggle() {
    const { unitSystem, toggleUnitSystem } = useWorkoutStore();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleUnitSystem}
            className="gap-2 min-w-[80px]"
        >
            <span className={unitSystem === 'metric' ? "font-bold text-primary" : "text-muted-foreground"}>Kg</span>
            <span className="text-muted-foreground">/</span>
            <span className={unitSystem === 'imperial' ? "font-bold text-primary" : "text-muted-foreground"}>Lbs</span>
        </Button>
    );
}
