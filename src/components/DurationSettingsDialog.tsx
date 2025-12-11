"use client";

import { useWorkoutStore } from "@/store/workoutStore";
import { Button, Input, Label } from "./ui/components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { useState } from "react";

interface DurationSettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DurationSettingsDialog({ isOpen, onClose }: DurationSettingsDialogProps) {
    const { durationSettings, updateDurationSettings } = useWorkoutStore();
    // Initialized from store on mount (which happens when dialog opens due to parent conditional rendering)
    const [localSettings, setLocalSettings] = useState(durationSettings);

    const handleSave = () => {
        updateDurationSettings(localSettings);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Workout Duration Settings</DialogTitle>
                    <DialogDescription>
                        Adjust how your estimated workout time is calculated.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rep-duration" className="text-right col-span-2">
                            Seconds per Rep
                        </Label>
                        <Input
                            id="rep-duration"
                            type="number"
                            value={localSettings.secondsPerRep}
                            onChange={(e) => setLocalSettings({ ...localSettings, secondsPerRep: Number(e.target.value) })}
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rest-duration" className="text-right col-span-2">
                            Rest Seconds (per set)
                        </Label>
                        <Input
                            id="rest-duration"
                            type="number"
                            value={localSettings.secondsPerSet}
                            onChange={(e) => setLocalSettings({ ...localSettings, secondsPerSet: Number(e.target.value) })}
                            className="col-span-2"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
