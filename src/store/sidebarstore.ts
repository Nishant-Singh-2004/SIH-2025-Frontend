import { create } from 'zustand';

// Defines the state and actions for the sidebar navigation panel.
interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

// Creates the Zustand store to manage the sidebar's visibility.
export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
