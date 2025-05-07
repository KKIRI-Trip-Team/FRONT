import { create } from 'zustand';

type TripContext = {
  destination: string;
  period: string;
  mate: string;
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
  resetContext: () => void;
}

export const useTripFunnelStore = create<TripFunnelStore>((set) => ({
  context: {
    destination: '',
    period: '',
    mate: '',
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

  resetContext: () =>
    set({
      context: {
        destination: '',
        period: '',
        mate: '',
        gender: '',
        ageRange: [],
        expense: 0,
        styles: [],
        explain: {},
      },
      stepIndex: 1,
    }),
}));
