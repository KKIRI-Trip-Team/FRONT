import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ScheduleItem = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  category_name: string;
  category_group_name: string;
  phone: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
};

// 상세일정 작성 시 각 요일별 마커 타입
type DayPlan = {
  day: number;
  places: ScheduleItem[];
};

// 퍼넬 단계별 상태
type TripContext = {
  destination: string;
  period: string;
  gender: string;
  ageRange: string[];
  styles: string[];
  expense: number;
  explain: {
    title: string;
    subTitle: string;
    image: string;
  };
  boardId?: string;
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
        destination: '',
        period: '',
        gender: '',
        ageRange: [],
        expense: 0,
        styles: [],
        explain: {
          title: '',
          subTitle: '',
          image: '',
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

          if (targetDay?.places.length === 20) {
            alert('하루에 최대 20개까지 선택가능합니다.');
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
            destination: '',
            period: '',
            gender: '',
            ageRange: [],
            expense: 0,
            styles: [],
            explain: {
              title: '',
              subTitle: '',
              image: '',
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
