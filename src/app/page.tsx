"use client";

import { BodyHeatmap } from "@/components/BodyHeatmap";
import { AddExerciseForm } from "@/components/AddExerciseForm";
import { useWorkoutStore } from "@/store/workoutStore";
import { useLanguageStore } from "@/store/languageStore";
import { AboutModal } from "@/components/AboutModal";

import Image from "next/image";

export default function Home() {
  const { heatmap } = useWorkoutStore();
  const { t } = useLanguageStore();

  return (
    <main className="flex-1 bg-background p-4 md:p-8">
      <AboutModal />
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero Banner */}
        <div className="w-full relative h-[200px] md:h-auto md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          {/* Mobile Banner */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/banner_mobile.png"
              alt="Smart Split Hero Banner"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          {/* Desktop Banner */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/banner_desktop.png"
              alt="Smart Split Hero Banner"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6 md:p-10">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 text-foreground drop-shadow-lg">
                {t('appTitle')}
              </h1>
              <p className="text-lg md:text-xl font-medium text-muted-foreground/90 backdrop-blur-sm rounded-lg inline-block">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>

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
