import { useState } from "react";
import { SelectParticipant } from "../SelectParticipant/SelectParticipant";

interface InputParticipantProps {
  onJoin: (memberName?: string, isVoter?: boolean) => void;
}

export function InputParticipant({ onJoin }: InputParticipantProps) {
  const [isVoter, setIsVoter] = useState<boolean>(true);
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="text-center sm:mt-2">
                  <SelectParticipant
                    isVoter={isVoter}
                    setIsVoter={setIsVoter}
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={() => onJoin("Anonymous", isVoter)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Join the room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
