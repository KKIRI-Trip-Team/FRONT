import { DayPlan, ScheduleItem } from '@/types/board';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  mode: 'create' | 'edit';

  setCurrentDay: (day: number) => void;
  setContext: (updated: Partial<TripContext>) => void;
  setStepIndex: (index: number) => void;
  setDayPlans: (plans: DayPlan[]) => void;
  setMode: (mode: 'create' | 'edit') => void;

  addPlaceToDay: (day: number, place: ScheduleItem) => boolean;
  removePlaceFromDay: (day: number, id: string) => void;
  movePlaceUp: (day: number, index: number) => void;
  movePlaceDown: (day: number, index: number) => void;

  resetAll: () => void;
}

export const useTripFunnelStore = create<TripFunnelStore>()(
  persist(
    (set, get) => ({
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
      setMode: (mode) => set({ mode }),

      setDayPlans: (plans) =>
        set({
          daysPlan: plans.map((d) => ({
            ...d,
            places: d.places.map((p) => ({
              ...p,
              kakaoPlaceId: p.kakaoPlaceId || p.id,
            })),
          })),
        }),

      // 장소 추가 -----------------

      addPlaceToDay: (day, place) => {
        set((state) => {
          const dayPlan = state.daysPlan.find((d) => d.day === day);

          // 중복 체크: id(서버 placeId) 또는 kakaoPlaceId(카카오 원본 ID) 기준
          const isDuplicate = dayPlan?.places.some(
            (p) =>
              p.id === place.id ||
              p.kakaoPlaceId === place.id ||
              p.kakaoPlaceId === place.kakaoPlaceId,
          );
          if (isDuplicate) {
            console.warn('[DEBUG][addPlaceToDay] 중복 추가 시도:', place);
            return {};
          }
          // kakaoPlaceId를 반드시 유지
          const newPlace: ScheduleItem = {
            ...place,
            kakaoPlaceId: place.kakaoPlaceId ?? place.id,
          };

          const updatedDaysPlan = dayPlan
            ? state.daysPlan.map((d) =>
                d.day === day ? { ...d, places: [...d.places, newPlace] } : d,
              )
            : [...state.daysPlan, { day, places: [newPlace] }];
          return { daysPlan: updatedDaysPlan };
        });
        return true;
      },

      // 장소 제거 -----------------
      removePlaceFromDay: (day, id) =>
        set((state) => ({
          daysPlan: state.daysPlan.map((d) =>
            d.day === day
              ? { ...d, places: d.places.filter((p) => p.id !== id) }
              : d,
          ),
        })),

      // 순서 이동 -----------------
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

      // 전체 리셋 -----------------
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
