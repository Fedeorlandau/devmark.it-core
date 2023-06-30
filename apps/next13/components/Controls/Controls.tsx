import { useRoom } from "@/stores/useRoom";
import React, { useMemo } from "react";

interface ControlProps {
  reset: () => void;
  reveal: () => void;
}

function Controls({ reset, reveal }: ControlProps) {
  const { room } = useRoom((state) => state);

  const selectedEstimates = useMemo(
    () => room?.selectedOptions.sort((a, b) => a.value - b.value) ?? [],
    [room?.selectedOptions]
  );

  return (
    <div className="pt-6 flex">
      <button
        onClick={() => reset()}
        className="m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
      >
        Reset
      </button>
      <button
        onClick={reveal}
        disabled={selectedEstimates.length === 0}
        className={`${
          !selectedEstimates.length ? "opacity-75 cursor-not-allowed" : ""
        } m-1 text-md py-1 px-4 rounded-md ring-1 ring-pink-400 bg-pink-500 hover:bg-pink-700 text-white`}
      >
        {room?.revealed ? "Hide" : "Reveal"}
      </button>
    </div>
  );
}

export default Controls;
