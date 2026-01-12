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
    <main className="flex-1 bg-background p-4 md:p-8">
      <AboutModal />
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-start">
          {/* Left Col: Inputs & List */}
          <div className="space-y-8">
            <AddExerciseForm />

            {/* Info Panel */}
            <div className="p-6 rounded-2xl bg-card border border-border text-card-foreground text-sm space-y-3 shadow-md">
              <h3 className="font-bold flex items-center gap-2 text-primary">
                <span className="p-1 rounded bg-primary/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                </span>
                {t('howItWorks')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('howItWorksText')}
              </p>
            </div>
          </div>

          {/* Right Col: Heatmap */}
          <div className="relative flex flex-col items-center p-8 rounded-3xl bg-card border border-border shadow-xl min-h-[700px] justify-center overflow-hidden">


            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10 tracking-tight">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              {t('muscleActivation')}
            </h2>
            <div className="scale-110 transition-transform duration-700">
              <BodyHeatmap heatmap={heatmap} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
