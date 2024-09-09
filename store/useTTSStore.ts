import { create } from "zustand";

type Store = {
  text: string;
  setText: (text: string) => void;

  voice: string;
  setVoice: (voice: string) => void;
};
export const useTTSStore = create<Store>()((set) => ({
  text: "",
  setText: (text) => set({ text }),

  voice: "",
  setVoice: (voice) => set({ voice }),
}));
