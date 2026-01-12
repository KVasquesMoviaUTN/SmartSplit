"use client";

import Image from "next/image";
import { useWorkoutStore } from "@/store/workoutStore";
import { Activity, Download } from "lucide-react";
import { UnitToggle } from "@/components/UnitToggle";
import { ModeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguageStore } from "@/store/languageStore";
import { generateWorkoutCSV } from "@/lib/utils";
import { Button } from "@/components/ui/components";

export function Navbar() {
  const { totalSystemStress } = useWorkoutStore();
  const { t } = useLanguageStore();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl border border-white/5 backdrop-blur-2xl shadow-2xl mb-8 transition-all hover:border-white/10 w-full">
      {/* Header Section */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
        <div className="p-2 bg-primary/10 rounded-xl relative group overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-500" />
          <Image src="/web-app-manifest-192x192.png" alt="Smart Split Logo" width={40} height={40} className="object-contain relative z-10" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground">
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
          <p className="text-muted-foreground text-xs md:text-sm hidden sm:block">{t('subtitle')}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end flex-wrap">
        <div className="flex items-center gap-1 md:gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const csv = generateWorkoutCSV(useWorkoutStore.getState().addedExercises);
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `workout-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            title="Export to CSV"
          >
            <Download className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <UnitToggle />
        </div>

        <div className={`flex flex-col min-w-[120px] md:min-w-[140px] relative overflow-hidden p-2 md:p-3 rounded-2xl border backdrop-blur-md transition-all duration-500 grow md:grow-0
          ${totalSystemStress < 200 ? 'bg-emerald-500/10 border-emerald-500/20' :
            totalSystemStress < 400 ? 'bg-yellow-500/10 border-yellow-500/20' :
              totalSystemStress < 600 ? 'bg-orange-500/10 border-orange-500/20' :
                'bg-violet-600/10 border-violet-500/20 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
          }`}>
          <div className="flex justify-between items-start mb-1">
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t('systemStress')}</span>
            <Activity className={`w-3 h-3 ${totalSystemStress > 600 ? 'animate-bounce text-violet-400' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl md:text-2xl font-black tracking-tight
              ${totalSystemStress < 200 ? 'text-emerald-500' :
                totalSystemStress < 400 ? 'text-yellow-400' :
                  totalSystemStress < 600 ? 'text-orange-500' :
                    'text-violet-400'
              }`}>
              {Math.round(totalSystemStress)}
            </span>
            <span className="text-[8px] md:text-[10px] font-medium text-muted-foreground">
              {totalSystemStress < 200 ? 'LIGHT' :
                totalSystemStress < 400 ? 'OPTIMAL' :
                  totalSystemStress < 600 ? 'HIGH' :
                    'EXTREME'}
            </span>
          </div>
          {/* Progress Bar Background */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
            {/* Active Progress */}
            <div
              className={`h-full transition-all duration-500 ${totalSystemStress < 200 ? 'bg-emerald-500' :
                totalSystemStress < 400 ? 'bg-yellow-400' :
                  totalSystemStress < 600 ? 'bg-orange-500' :
                    'bg-violet-500'
                }`}
              style={{ width: `${Math.min((totalSystemStress / 800) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
