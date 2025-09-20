import { create } from 'zustand';

// Define the possible user roles
export type UserRole = 'admin' | 'teacher' | 'student';

// Define the state and actions for our authentication store
interface AuthState {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

// Create the Zustand store to manage the current user's role
export const useAuthStore = create<AuthState>((set) => ({
  userRole: 'admin', // Default role when the app loads
  setUserRole: (role) => set({ userRole: role }),
}));
