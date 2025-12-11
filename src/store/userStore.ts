
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStats {
    age: number;
    height: number; // cm
    weight: number; // kg
    gender: 'male' | 'female';
}

interface UserStore extends UserStats {
    updateStats: (stats: Partial<UserStats>) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            age: 25,
            height: 175,
            weight: 75,
            gender: 'male',
            updateStats: (stats) => set((state) => ({ ...state, ...stats })),
        }),
        {
            name: 'user-storage',
        }
    )
);
