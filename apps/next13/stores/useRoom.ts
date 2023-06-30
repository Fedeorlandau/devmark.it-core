import create from "zustand";
import { Room } from "../types";

type State = {
  room: Room | null;
  name: string;
  setName: (name?: string) => void;
  setRoom: (room: Room) => void;
  reset: () => void;
  revealed: boolean;
  voted: boolean;
  toggleRevealed: () => void;
  setVoted: (voted: boolean) => void;
  clearRoom: () => void;
};

export const useRoom = create<State>((set) => ({
  room: null,
  name: "",
  setName: (name) => set({ name }),
  setRoom: (room: Room) => set({ room }),
  reset: () =>
    set((state) => {
      return {
        voted: false,
      };
    }),
  toggleRevealed: () => set((state) => ({ revealed: !state.revealed })),
  voted: false,
  setVoted: (voted) =>
    set((state) => {
      return {
        voted,
      };
    }),
  revealed: false,
  clearRoom: () => set({ room: null, name: "", revealed: false, voted: false }),
}));
