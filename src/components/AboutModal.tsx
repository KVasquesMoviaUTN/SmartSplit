"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/components";
import { Info } from "lucide-react";

export function AboutModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-muted">
                    <Info className="h-5 w-5" />
                    <span className="sr-only">About Project</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>About Smart Split</DialogTitle>
                    <DialogDescription>
                        A high-performance PWA built for muscle recovery analysis.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <h4 className="font-medium leading-none text-primary">Tech Stack</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                            <li>Framework: <b>Next.js 16 (App Router)</b></li>
                            <li>State Management: <b>Zustand</b></li>
                            <li>Styling: <b>Tailwind CSS v4</b></li>
                            <li>Testing: <b>Jest & React Testing Library</b></li>
                            <li>CI/CD: <b>GitHub Actions</b></li>
                        </ul>

                        <h4 className="font-medium leading-none text-primary pt-2">Features</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                            <li>Linear Fatigue Algorithm</li>
                            <li>Interactive SVG Heatmap</li>
                            <li>Offline PWA Support</li>
                            <li>Strict TypeScript Strictness</li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
