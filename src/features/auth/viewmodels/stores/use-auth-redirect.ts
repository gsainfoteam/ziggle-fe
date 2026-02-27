import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthRedirectState {
  redirect: string | undefined;
  setRedirect: (redirect: string | undefined) => void;
  clearRedirect: () => void;
}

const AUTH_REDIRECT_STORAGE_KEY = 'auth-redirect';

export const useAuthRedirect = create<AuthRedirectState>()(
  persist(
    (set) => ({
      redirect: undefined,
      setRedirect: (redirect) => set((prev) => ({ ...prev, redirect })),
      clearRedirect: () => set((prev) => ({ ...prev, redirect: undefined })),
    }),
    {
      name: AUTH_REDIRECT_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
