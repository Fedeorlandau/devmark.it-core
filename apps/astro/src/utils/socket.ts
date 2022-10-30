import { io, Socket } from "socket.io-client";

interface UseSocketProps {
  roomId: string;
  onUpdated?: (event: { name: string; data: any }) => void;
  onException?: () => void;
  onConnect?: () => void;
  onJoined?: () => void;
  onExpired?: () => void;
}

export default function initSocket({
  roomId,
  onUpdated,
  onException,
  onConnect,
  onJoined,
  onExpired,
}: UseSocketProps): Socket {
  const socket = io(import.meta.env.PUBLIC_WS_URL);

  socket.on("connect", function () {
    socket.emit("events", { type: "join", payload: { id: roomId } });
    onConnect?.();
  });

  socket.on("updated", function (event) {
    onUpdated?.(event);
  });

  socket.on("exception", function (event) {
    onException?.();
  });

  socket.on("joined", function () {
    onJoined?.();
  });

  socket.on("expire", function () {
    socket.close();
    onExpired?.();
  });

  return socket;
}
