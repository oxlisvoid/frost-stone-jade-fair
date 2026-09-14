import { create } from "zustand";

const KEY = "oxlisvoid-access";

type AccessState = {
  unlocked: boolean;
  ready: boolean;
  hydrate: () => void;
  unlock: () => void;
};

export const useAccess = create<AccessState>((set) => ({
  unlocked: false,
  ready: false,
  hydrate: () => {
    try {
      set({ unlocked: localStorage.getItem(KEY) === "1", ready: true });
    } catch {
      set({ unlocked: false, ready: true });
    }
  },
  unlock: () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    set({ unlocked: true, ready: true });
  },
}));
