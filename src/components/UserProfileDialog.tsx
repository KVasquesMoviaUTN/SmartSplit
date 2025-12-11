
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button, Input, Label } from "./ui/components";
import { useUserStore } from "@/store/userStore";
// import { useLanguageStore } from "@/store/languageStore"; // Unused

interface UserProfileDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileDialog({ isOpen, onClose }: UserProfileDialogProps) {
    const { age, height, weight, gender, updateStats } = useUserStore();

    const [localStats, setLocalStats] = useState({ age, height, weight, gender });

    useEffect(() => {
        if (isOpen) {
            setLocalStats({ age, height, weight, gender });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleSave = () => {
        updateStats(localStats);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Profile Settings</DialogTitle>
                    <DialogDescription>
                        Update your stats for accurate calorie estimation.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gender" className="text-right">
                            Gender
                        </Label>
                        <select
                            id="gender"
                            value={localStats.gender}
                            onChange={(e) => setLocalStats({ ...localStats, gender: e.target.value as 'male' | 'female' })}
                            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">
                            Age
                        </Label>
                        <Input
                            id="age"
                            type="number"
                            value={localStats.age}
                            onChange={(e) => setLocalStats({ ...localStats, age: Number(e.target.value) })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                            Weight (kg)
                        </Label>
                        <Input
                            id="weight"
                            type="number"
                            value={localStats.weight}
                            onChange={(e) => setLocalStats({ ...localStats, weight: Number(e.target.value) })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="height" className="text-right">
                            Height (cm)
                        </Label>
                        <Input
                            id="height"
                            type="number"
                            value={localStats.height}
                            onChange={(e) => setLocalStats({ ...localStats, height: Number(e.target.value) })}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
