import { cn } from "lib/utils";
import { useState } from "react";

interface InputNameProps {
  onJoin: (name?: string, isVoter?: boolean) => void;
}
function InputName({ onJoin }: InputNameProps) {
  const [name, setName] = useState<string>();
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
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Please enter your name
                  </h3>
                  <div className="mt-4">
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 text-black shadow-sm focus:ring-pink-700 focus:outline-none border-pink-500 border focus:border-pink-700 block w-full sm:text-sm rounded-md"
                    />
                  </div>
                  <div className="border shadow-md rounded-md flex space-between mt-2 bg-gray-200">
                    <button
                      onClick={() => setIsVoter(true)}
                      className={cn(
                        "w-full px-2 py-1 rounded-md transition-colors duration-100",
                        isVoter
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-black"
                      )}
                    >
                      Voter
                    </button>
                    <button
                      onClick={() => setIsVoter(false)}
                      className={cn(
                        "w-full px-2 py-1 rounded-md transition-colors duration-100",
                        !isVoter
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-black"
                      )}
                    >
                      Spectator
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={() => onJoin(name, isVoter)}
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

export default InputName;
