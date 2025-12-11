"use client";

import { useLanguageStore, LANGUAGES, LanguageCode } from "@/store/languageStore";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore();

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground [&>option]:bg-background [&>option]:text-foreground max-w-[150px]"
        >
            {Object.entries(LANGUAGES).map(([code, label]) => (
                <option key={code} value={code}>
                    {label}
                </option>
            ))}
        </select>
    );
}
