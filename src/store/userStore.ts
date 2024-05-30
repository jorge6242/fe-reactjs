import create from 'zustand';

export interface UserState {
  user: string | null;
  setUser: (user: string | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: string | null) => set({ user })
}));

export default useUserStore;
