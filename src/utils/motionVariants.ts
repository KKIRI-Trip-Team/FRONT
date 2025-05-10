import { Direction } from '@/store/transitionStore';

export const slideFadeVariants = {
  initial: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'forward' ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
  exit: (direction: Direction) => ({
    opacity: 0,
    x: direction === 'forward' ? -50 : 50,
    transition: { duration: 0.3 },
  }),
};
