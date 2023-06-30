import React from "react";

interface EstimatesOptionsProps {
  options?: number[];
  voted: boolean;
  vote: (estimate: number) => void;
}
function EstimatesOptions({ options, voted, vote }: EstimatesOptionsProps) {
  return (
    <div className={`${voted ? "opacity-75" : ""}`}>
      {options?.map((option) => (
        <button
          key={option}
          onClick={() => vote(option)}
          className="
                                  bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 hover:to-red-400 hover:via-red-400 text-white"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default EstimatesOptions;
