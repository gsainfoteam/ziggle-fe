import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthPromptState {
  recentLogout: boolean;
  setRecentLogout: (recentLogout: boolean) => void;
  requiredConsents: boolean | undefined;
  setRequiredConsents: (requiredConsents: boolean | undefined) => void;
  pendingToken: string | null;
  setPendingToken: (token: string | null) => void;
}

const AUTH_PROMPT_STORAGE_KEY = 'auth-prompt';

export const useAuthPrompt = create<AuthPromptState>()(
  persist(
    (set) => ({
      recentLogout: false,
      setRecentLogout: (recentLogout) =>
        set((prev) => ({ ...prev, recentLogout })),
      requiredConsents: undefined,
      setRequiredConsents: (requiredConsents) =>
        set((prev) => ({ ...prev, requiredConsents })),
      pendingToken: null,
      setPendingToken: (pendingToken) =>
        set((prev) => ({ ...prev, pendingToken })),
    }),
    {
      name: AUTH_PROMPT_STORAGE_KEY,
      partialize: (state) => ({
        requiredConsents: state.requiredConsents,
        pendingToken: state.pendingToken,
      }),
    },
  ),
);
