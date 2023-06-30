import React from "react";

interface EstimatesAverageProps {
  average?: number;
  revealed?: boolean;
}
function EstimatesAverage({ average, revealed }: EstimatesAverageProps) {
  return (
    <p className="mt-4 text-black dark:text-white font-bold">
      Average: { revealed ? average : "?"}
    </p>
  );
}

export default EstimatesAverage;
