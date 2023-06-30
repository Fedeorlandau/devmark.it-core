import { useSocket } from "@/stores/useSocket";
import { useEffect } from "react";
import { io } from "socket.io-client";

const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string;

interface UseSocketProps {
  id?: string;
  onInitialized?: () => void;
  onUpdated?: (event: { name: string; data: any }) => void;
  onException?: () => void;
  onConnect?: () => void;
  onJoined?: () => void;
  onExpired?: () => void;
}

export default function initSocket({
  id,
  onInitialized,
  onConnect,
  onUpdated,
  onJoined,
  onException,
  onExpired,
}: UseSocketProps) {
  const { setSocket, setIsConnected, setIsJoined, setIsExpired } = useSocket(
    (state) => state
  );

  useEffect(() => {
    const newSocket = io(wsUrl);
    onInitialized?.();
    setIsExpired(false);
    setIsConnected(false);
    setIsJoined(false);
    newSocket.on("connect", function () {
      newSocket.emit("events", { type: "join", payload: { id } });
      setIsConnected(true);
      onConnect?.();
    });

    newSocket.on("updated", (event) => {
      onUpdated?.(event);
    });

    newSocket.on("exception", function () {
      onException?.();
    });

    newSocket.on("joined", function () {
      setIsJoined(true);
      onJoined?.();
    });

    newSocket.on("expire", function () {
      setIsExpired(true);
      newSocket.close();
      onExpired?.();
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);
}
