import { useRoom } from "@/stores/useRoom";
import { cn } from "lib/utils";
import React from "react";

interface EstimatesOptionsProps {
  options?: number[];
  voted: boolean;
  vote: (estimate: number) => void;
}
function EstimatesOptions({ options, voted, vote }: EstimatesOptionsProps) {
  const { participant } = useRoom((state) => state);

  function handleVote(option: number) {
    if (participant === "Spectator") {
      return;
    } else {
      vote(option);
    }
  }

  return (
    <div className={`${voted ? "opacity-75" : ""}`}>
      {options?.map((option) => (
        <button
          key={option}
          onClick={() => handleVote(option)}
          className={cn(
            "bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500  text-white",
            participant === "Spectator"
              ? "cursor-not-allowed opacity-50"
              : "hover:to-red-400 hover:via-red-400"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default EstimatesOptions;
