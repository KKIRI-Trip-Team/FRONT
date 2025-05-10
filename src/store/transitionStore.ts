import { create } from 'zustand';

export type Direction = 'forward' | 'backward';

interface TransitionStore {
  direction: Direction;
  setDirection: (dir: Direction) => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  direction: 'forward',
  setDirection: (dir) => set({ direction: dir }),
}));
