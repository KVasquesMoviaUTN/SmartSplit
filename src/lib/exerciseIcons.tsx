import { Dumbbell, Activity, Footprints, User } from "lucide-react";

export const getIconForExercise = (id: string) => {
    if (id.includes('dumbbell') || id.includes('curl') || id.includes('raise') || id.includes('fly')) return <Dumbbell className="h-4 w-4 text-cyan-400" />;
    if (id.includes('barbell') || id.includes('press') || id.includes('row') || id.includes('deadlift') || id.includes('squat')) return <Activity className="h-4 w-4 text-rose-400" />;
    if (id.includes('leg') || id.includes('lunge') || id.includes('calf')) return <Footprints className="h-4 w-4 text-emerald-400" />;
    if (id.includes('pull_up') || id.includes('dip') || id.includes('push_up') || id.includes('plank')) return <User className="h-4 w-4 text-yellow-400" />;
    return <Activity className="h-4 w-4 text-muted-foreground" />;
};
