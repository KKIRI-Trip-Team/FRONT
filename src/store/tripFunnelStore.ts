import { ScheduleItem } from '@/types/board';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상세일정 작성 시 각 요일별 마커 타입
type DayPlan = {
  day: number;
  places: ScheduleItem[];
};

// 퍼넬 단계별 상태
export type TripContext = {
  region: string;
  period: string;
  gender: string;
  ageGroup: string;
  tripStyles: string[];
  cost: number;
  explain: {
    title: string;
    subTitle: string;
    coverImageUrl: string;
  };
  boardId?: number;
};

interface TripFunnelStore {
  trip: TripContext;
  stepIndex: number;
  daysPlan: DayPlan[];

  currentDay: number;
  setCurrentDay: (day: number) => void;

  addPlaceToDay: (day: number, place: ScheduleItem) => void;
  removePlaceFromDay: (day: number, id: string) => void;
  movePlaceUp: (day: number, index: number) => void;
  movePlaceDown: (day: number, index: number) => void;

  setContext: (updated: Partial<TripContext>) => void;
  setStepIndex: (index: number) => void;
  setDayPlans: (plans: DayPlan[]) => void;

  resetAll: () => void;

  mode: 'create' | 'edit';
  setMode: (mode: 'create' | 'edit') => void;
}

export const useTripFunnelStore = create<TripFunnelStore>()(
  persist(
    (set) => ({
      trip: {
        region: '',
        period: '',
        gender: '',
        ageGroup: '',
        cost: 0,
        tripStyles: [],
        explain: {
          title: '',
          subTitle: '',
          coverImageUrl: '',
        },
      },
      currentDay: 1,
      stepIndex: 1,
      daysPlan: [],
      mode: 'create',

      setCurrentDay: (day) => set({ currentDay: day }),

      setContext: (updated) =>
        set((state) => ({
          trip: {
            ...state.trip,
            ...updated,
            explain: {
              ...state.trip.explain,
              ...(updated.explain ?? {}),
            },
          },
        })),

      setStepIndex: (index) => set({ stepIndex: index }),

      setDayPlans: (plans) => set({ daysPlan: plans }),

      setMode: (mode) => set({ mode }),

      addPlaceToDay: (day, place) =>
        set((state) => {
          const updatedPlans = [...state.daysPlan];
          const targetDay = updatedPlans.find((d) => d.day === day);

          if (targetDay) {
            const isDuplicatePlace = targetDay.places.some(
              (p) => p.id === place.id,
            );
            if (isDuplicatePlace) {
              alert('이미 선택한 장소입니다.');
              return state;
            }

            targetDay.places.push(place);
          } else {
            updatedPlans.push({ day, places: [place] });
          }

          return { daysPlan: updatedPlans };
        }),

      removePlaceFromDay: (day, id) =>
        set((state) => ({
          daysPlan: state.daysPlan.map((d) =>
            d.day === day
              ? { ...d, places: d.places.filter((p) => p.id !== id) }
              : d,
          ),
        })),

      movePlaceUp: (day, index) =>
        set((state) => ({
          daysPlan: state.daysPlan.map((d) => {
            if (d.day !== day || index <= 0) return d;
            const newPlaces = [...d.places];
            [newPlaces[index - 1], newPlaces[index]] = [
              newPlaces[index],
              newPlaces[index - 1],
            ];
            return { ...d, places: newPlaces };
          }),
        })),

      movePlaceDown: (day, index) =>
        set((state) => ({
          daysPlan: state.daysPlan.map((d) => {
            if (d.day !== day || index >= d.places.length - 1) return d;
            const newPlaces = [...d.places];
            [newPlaces[index + 1], newPlaces[index]] = [
              newPlaces[index],
              newPlaces[index + 1],
            ];
            return { ...d, places: newPlaces };
          }),
        })),

      resetAll: () => {
        set({
          trip: {
            region: '',
            period: '',
            gender: '',
            ageGroup: '',
            cost: 0,
            tripStyles: [],
            explain: {
              title: '',
              subTitle: '',
              coverImageUrl: '',
            },
          },
          stepIndex: 1,
          daysPlan: [],
          mode: 'create',
        });
        localStorage.removeItem('trip-storage');
      },
    }),
    {
      name: 'trip-storage',

      partialize: (state) => ({
        trip: state.trip,
        daysPlan: state.daysPlan,
        mode: state.mode,
      }),
    },
  ),
);
