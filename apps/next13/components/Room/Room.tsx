"use client";

import initSocket from "@/hooks/initSocket";
import ExpiredMessage from "@/components/ExpiredMessage";
import InputName from "@/components/InputName";
import { useEffect, useMemo } from "react";
import Loader from "@/components/Loader";
import RoomContent from "@/components/RoomContent";
import { useRoom } from "@/stores/useRoom";
import { useSocket } from "@/stores/useSocket";

interface RoomProps {
  id: string;
  type?: "anon" | "private";
}

function Room({ id, type = "private" }: RoomProps) {
  const { isExpired, isJoined, socket } = useSocket((state) => state);
  const {
    room,
    setName,
    setParticipant,
    setRoom,
    setVoted,
    clearRoom,
    toggleRevealed,
  } = useRoom((state) => state);

  console.log(room);

  initSocket({
    id,
    onInitialized: () => {
      clearRoom();
    },
    onUpdated: (event) => {
      setRoom(event.data);
    },
  });

  useEffect(() => {
    if (socket && room && type === "anon" && !isJoined) {
      onJoin("Anonymous");
    }
  }, [socket, room, type, isJoined]);

  const onJoin = (memberName?: string, isVoter?: boolean) => {
    console.log(isVoter);
    socket?.emit("events", {
      type: "update_name",
      payload: {
        id,
        name: memberName,
        participant: isVoter ? "Voter" : "Spectator",
      },
    });
    setName(memberName);
    setParticipant(isVoter ? "Voter" : "Spectator");
  };

  const vote = (estimate: number) => {
    socket?.emit("events", {
      type: "vote",
      payload: { id, option: estimate },
    });
    setVoted(true);
  };

  const reset = () => {
    socket?.emit("events", { type: "reset", payload: { id } });
    setVoted(false);
  };

  const reveal = () => {
    toggleRevealed();
    socket?.emit("events", { type: "reveal", payload: { id } });
  };

  const isOwner = useMemo(() => {
    return socket?.id === room?.owner;
  }, [room, socket]);

  return (
    <div className="w-full py-6 px-6 md:px-0">
      <ExpiredMessage isExpired={isExpired} />

      {!isJoined && <Loader />}
      {!isJoined && type === "private" && (
        <>
          <InputName onJoin={onJoin} />
        </>
      )}

      {isJoined && room && (
        <RoomContent
          vote={vote}
          reset={reset}
          isOwner={isOwner}
          reveal={reveal}
        />
      )}
    </div>
  );
}

export default Room;
