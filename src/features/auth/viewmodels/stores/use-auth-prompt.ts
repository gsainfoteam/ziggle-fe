import { create } from 'zustand';

interface AuthPromptState {
  requiredConsents: boolean | undefined;
  setRequiredConsents: (requiredConsents: boolean | undefined) => void;
}

export const useAuthPrompt = create<AuthPromptState>()((set) => ({
  requiredConsents: undefined,
  setRequiredConsents: (requiredConsents) =>
    set((prev) => ({ ...prev, requiredConsents })),
}));
