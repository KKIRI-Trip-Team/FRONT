import { create } from 'zustand';

export type SelectedPlace = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  category_name: string;
  phone: string;
  x: string;
  y: string;
};

interface MapStore {
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: (place: SelectedPlace) => void;
  clearSelectedPlace: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  clearSelectedPlace: () => set({ selectedPlace: null }),
}));
