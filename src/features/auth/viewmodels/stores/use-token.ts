import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null;
  saveToken: (token: string | null) => void;
}

const TOKEN_STORAGE_KEY = 'token';

export const useToken = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      saveToken: (token) => set((state) => ({ ...state, token })),
    }),
    { name: TOKEN_STORAGE_KEY },
  ),
);
