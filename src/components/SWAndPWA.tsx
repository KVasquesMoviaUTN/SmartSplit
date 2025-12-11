"use client";

import { useEffect } from "react";

export function SWAndPWA() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => console.log("SW Scope:", registration.scope))
                .catch((err) => console.error("SW Error:", err));
        }
    }, []);

    return null;
}
