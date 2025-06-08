import { create } from 'zustand';

interface MapStore {
  selectedPlace: kakao.maps.services.PlacesSearchResultItem | null;
  setSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  clearSelectedPlace: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  clearSelectedPlace: () => set({ selectedPlace: null }),
}));
