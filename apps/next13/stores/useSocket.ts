import create from "zustand";
import { Socket } from "socket.io-client";

type State = {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  isJoined: boolean;
  setIsJoined: (isJoined: boolean) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  isExpired: boolean;
  setIsExpired: (isExpired: boolean) => void;
};

export const useSocket = create<State>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
  isJoined: false,
  setIsJoined: (isJoined: boolean) => set({ isJoined }),
  isConnected: false,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  isExpired: false,
  setIsExpired: (isExpired: boolean) => set({ isExpired }),
}));
