import { cn } from "lib/utils";
import { useState } from "react";

interface SelectParticipantProps {
  isVoter: boolean;
  setIsVoter: (isVoter: boolean) => void;
}

export function SelectParticipant({
  isVoter,
  setIsVoter,
}: SelectParticipantProps) {
  return (
    <div className="border shadow-md rounded-md flex space-between mt-2 bg-gray-200">
      <button
        onClick={() => setIsVoter(true)}
        className={cn(
          "w-full px-2 py-1 rounded-md transition-colors duration-100",
          isVoter ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
        )}
      >
        Voter
      </button>
      <button
        onClick={() => setIsVoter(false)}
        className={cn(
          "w-full px-2 py-1 rounded-md transition-colors duration-100",
          !isVoter ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"
        )}
      >
        Spectator
      </button>
    </div>
  );
}
