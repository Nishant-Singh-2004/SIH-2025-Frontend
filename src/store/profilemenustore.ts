import { create } from 'zustand';

// Defines the state and actions for the profile dropdown menu.
interface ProfileMenuState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

// Creates the Zustand store.
export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
