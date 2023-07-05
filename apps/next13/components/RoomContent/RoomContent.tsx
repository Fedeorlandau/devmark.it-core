import { useRoom } from "@/stores/useRoom";
import Controls from "@/components/Controls";
import RoomHeader from "@/components/RoomHeader";
import EstimatesOptions from "@/components/EstimatesOptions";
import EstimatesList from "@/components/EstimatesList";

import { useMemo } from "react";
import EstimatesAverage from "@/components/EstimatesAverage";
import Members from "@/components/Members";
import { cn } from "lib/utils";

interface RoomContentProps {
  vote: (estimate: number) => void;
  reset: () => void;
  reveal: () => void;
  isOwner: boolean;
}
function RoomContent({ vote, reset, isOwner, reveal }: RoomContentProps) {
  const { room, voted, name } = useRoom((state) => state);

  const selectedEstimates = useMemo(
    () => room?.selectedOptions.sort((a, b) => a.value - b.value),
    [room?.selectedOptions]
  );

  const total = useMemo(
    () =>
      room?.membersInfo.filter((member) => member.participant === "Voter")
        .length ?? 0,
    [room?.membersInfo.length]
  );

  console.log(total);

  const averageEstimates = useMemo(() => {
    if (!selectedEstimates?.length) {
      return 0;
    }

    const sum = selectedEstimates.reduce(
      (acc, estimate) => acc + estimate.value,
      0
    );

    return sum / selectedEstimates.length;
  }, [selectedEstimates]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full max-w-md">
          <RoomHeader name={name} />
          <div className="grid grid-cols-1 divide-y space-y-8 divide-black dark:divide-white max-w-md">
            <EstimatesOptions
              options={room?.options.values}
              voted={voted}
              vote={vote}
            />
            {isOwner && <Controls reset={reset} reveal={reveal} />}
          </div>
        </div>

        <div className="flex-grow-0 md:px-4 md:mx-16 max-w-lg">
          <h2 className="my-4 text-xl md:text-3xl text-black dark:text-white font-bold leading-tight">
            Team estimates
          </h2>
          <div
            className={cn(
              "flex flex-wrap",
              !room?.revealed ? "opacity-50" : ""
            )}
          >
            <EstimatesList
              estimates={selectedEstimates}
              total={total}
              revealed={room?.revealed}
            />
          </div>
          <EstimatesAverage
            average={averageEstimates}
            revealed={room?.revealed}
          />
        </div>
      </div>
      <Members members={room?.membersInfo} />
    </>
  );
}

export default RoomContent;
