import React, { useMemo } from "react";

interface EstimatesListProps {
  estimates?: {
    value: number;
  }[];
  revealed?: boolean;
  total: number;
}

function EstimatesList({ estimates, revealed, total }: EstimatesListProps) {
  const missingEstimates = useMemo(
    () => total - (estimates?.length ?? 0),
    [estimates?.length, total]
  );

  return (
    <>
      {estimates?.map((estimate, index) => (
        <div
          key={index}
          className="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500  text-white"
        >
          {revealed ? estimate.value : "?"}
        </div>
      ))}

      {Array.from({ length: missingEstimates }).map((_, index) => (
        <div
          key={index}
          className="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md border-2 border-purple-400 border-dashed 0  text-white"
        />
      ))}
    </>
  );
}

export default EstimatesList;
