import { create } from 'zustand';

interface AuthPromptState {
  recentLogout: boolean;
  setRecentLogout: (recentLogout: boolean) => void;
  requiredConsents: boolean | undefined;
  setRequiredConsents: (requiredConsents: boolean | undefined) => void;
}

export const useAuthPrompt = create<AuthPromptState>()((set) => ({
  recentLogout: false,
  setRecentLogout: (recentLogout) => set((prev) => ({ ...prev, recentLogout })),
  requiredConsents: undefined,
  setRequiredConsents: (requiredConsents) =>
    set((prev) => ({ ...prev, requiredConsents })),
}));
