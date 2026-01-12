"use client";

import { BodyHeatmap } from "@/components/BodyHeatmap";
import { AddExerciseForm } from "@/components/AddExerciseForm";
import { useWorkoutStore } from "@/store/workoutStore";
import { useLanguageStore } from "@/store/languageStore";
import { AboutModal } from "@/components/AboutModal";

export default function Home() {
  const { heatmap } = useWorkoutStore();
  const { t } = useLanguageStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 md:p-8">
      <AboutModal />
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Col: Inputs & List */}
          <div className="space-y-6">
            <AddExerciseForm />

            {/* Info Panel */}
            <div className="p-6 rounded-xl bg-card border text-card-foreground text-sm space-y-2">
              <h3 className="font-semibold">{t('howItWorks')}</h3>
              <p className="text-muted-foreground">
                {t('howItWorksText')}
              </p>
            </div>
          </div>

          {/* Right Col: Heatmap */}
          <div className="relative flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner min-h-[600px] justify-center overflow-hidden group">
            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {t('muscleActivation')}
            </h2>
            <BodyHeatmap heatmap={heatmap} />
          </div>
        </div>
      </div>
    </main>
  );
}
