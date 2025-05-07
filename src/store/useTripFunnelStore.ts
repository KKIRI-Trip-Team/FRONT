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
  setContext: (updated: Partial<TripContext>) => void;
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
  setContext: (updated) =>
    set((state) => ({
      context: {
        ...state.context,
        ...updated,
      },
    })),

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
    }),
}));
