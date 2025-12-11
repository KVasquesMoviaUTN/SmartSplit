"use client";

import { BodyHeatmap } from "@/components/BodyHeatmap";
import { AddExerciseForm } from "@/components/AddExerciseForm";
import { useWorkoutStore } from "@/store/workoutStore";
import { Activity } from "lucide-react";
import { UnitToggle } from "@/components/UnitToggle";
import { ModeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguageStore } from "@/store/languageStore";

import { AboutModal } from "@/components/AboutModal";

export default function Home() {
  const { heatmap, totalSystemStress } = useWorkoutStore();
  const { t } = useLanguageStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 md:p-8">
      <AboutModal />
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              {/* <Dumbbell className="h-8 w-8" /> */}
              <img src="/web-app-manifest-192x192.png" alt="Smart Split Logo" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t('appTitle') === 'Smart Split' ? (
                  <span className="flex items-center">
                    <span>Smart Spl</span>
                    <span className="relative px-[0.02em]">
                      <span>ı</span>
                      <span className="absolute left-1/2 -translate-x-1/2 top-[0.14em] w-[0.22em] h-[0.22em] bg-[#38C172] rounded-full"></span>
                    </span>
                    <span>t</span>
                  </span>
                ) : (
                  <span>
                    {t('appTitle')}
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-end">
            <LanguageSwitcher />
            <ModeToggle />
            <UnitToggle />
            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t('systemStress')}</div>
                <div className="text-2xl font-mono font-bold text-foreground">{totalSystemStress.toFixed(1)}</div>
              </div>
              <Activity className={`h-8 w-8 ${totalSystemStress > 50 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`} />
            </div>
          </div>

          {/* Content Grid */}
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
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner min-h-[600px] justify-center">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                {t('muscleActivation')}
              </h2>
              <BodyHeatmap heatmap={heatmap} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
