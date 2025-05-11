import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TripContext = {
  destination: string;
  period: string;
  gender: string;
  ageRange: string[];
  styles: string[];
  expense: number;
  explain: Record<string, any>;
};

interface TripFunnelStore {
  context: TripContext;
  stepIndex: number;
  setContext: (updated: Partial<TripContext>) => void;
  setStepIndex: (index: number) => void;
  resetAll: () => void;
}

export const useTripFunnelStore = create<TripFunnelStore>()(
  persist(
    (set) => ({
      context: {
        destination: '',
        period: '',
        gender: '',
        ageRange: [],
        expense: 0,
        styles: [],
        explain: {},
      },
      stepIndex: 1,

      setContext: (updated) =>
        set((state) => ({
          context: {
            ...state.context,
            ...updated,
          },
        })),

      setStepIndex: (index) => set({ stepIndex: index }),

      resetAll: () => {
        set({
          context: {
            destination: '',
            period: '',
            gender: '',
            ageRange: [],
            expense: 0,
            styles: [],
            explain: {},
          },
          stepIndex: 1,
        });
        localStorage.removeItem('trip-funnel-storage');
      },
    }),

    {
      name: 'trip-funnel-storage', // localStorage key
      partialize: (state) => ({ context: state.context }), // 필요한 값만 저장
    },
  ),
);
