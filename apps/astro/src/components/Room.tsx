import type { Socket } from "socket.io-client";
import { createMemo, createSignal, onCleanup, onMount, Owner } from "solid-js";
import initSocket from "../utils/socket";

const defaultRoom = {
  owner: "",
  options: {
    id: 0,
    label: "Fibonacci",
    values: [],
  },
  members: [],
  membersInfo: [],
  selectedOptions: [],
  revealed: false,
};

export default function Room({ roomId }: { roomId: string }) {
  const [socket, setSocket] = createSignal<Socket | null>(null);
  const [isConnected, setIsConnected] = createSignal(false);
  const [joined, setJoined] = createSignal(false);
  const [expired, setExpired] = createSignal(false);
  const [room, setRoom] = createSignal(defaultRoom);
  const [name, setName] = createSignal("");
  const [voted, setVoted] = createSignal(false);

  let owner = createMemo(() => {
    return socket()?.id === room().owner;
  });

  let selectedEstimates = createMemo(() => {
    return room()?.selectedOptions.sort((a, b) => a.value - b.value);
  });

  let missingOptions = createMemo(() => {
    return room().members.length - room()?.selectedOptions.length;
  });

  let average = createMemo(() => {
    return room()?.selectedOptions.length
      ? (
          room()?.selectedOptions.reduce((a, b) => a + b.value, 0) /
          room()?.selectedOptions.length
        ).toFixed(2)
      : 0;
  });

  onMount(() => {
    const s = initSocket({
      roomId,
      onConnect: () => {
        setIsConnected(true);
      },
      onUpdated: (event) => {
        setRoom(event.data);
      },
      onJoined: () => {
        setJoined(true);
      },
      onExpired: () => {
        setExpired(true);
      },
    });
    setSocket(s);
  });

  onCleanup(() => {
    socket()?.close();
  });

  let updateName = () => {
    socket()?.emit("events", {
      type: "update_name",
      payload: { id: roomId, name: name() },
    });
  };

  let vote = (option: number) => {
    setVoted(true);
    socket()?.emit("events", { type: "vote", payload: { id: roomId, option } });
  };

  let share = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  let reset = () => {
    socket()?.emit("events", { type: "reset", payload: { id: roomId } });
    setVoted(false);
  };

  let toggleRevealed = () => {
    socket()?.emit("events", { type: "reveal", payload: { id: roomId } });
  };

  return (
    <div class="w-full py-6 px-6 md:px-0">
      {!isConnected() && (
        <div class="flex flex-col items-center justify-center">
          <div
            style="border-top-color:transparent"
            class="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
          />
          <p class="text-white text-xl mt-4">Connecting to the room</p>
        </div>
      )}
      {isConnected() && expired() && (
        <div class="flex mb-4">
          <p class="px-2 py-1 border bg-red-800 border-red-400 rounded-md text-white">
            Room expired. Please reload the page.
          </p>
        </div>
      )}

      {isConnected() && !joined() && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div class="relative bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div class="text-center sm:mt-2">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Please enter your name
                    </h3>
                    <div class="mt-4">
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        class="p-2 text-black shadow-sm focus:ring-pink-700 focus:outline-none border-pink-500 border focus:border-pink-700 block w-full sm:text-sm rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={updateName}
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Join the room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConnected() && (
        <>
          <div class="flex flex-col md:flex-row">
            <div class="w-full max-w-md">
              <div class="flex items-center">
                <h1 class="text-md text-white leading-tight inline-block">
                  Welcome {name} to your room.
                </h1>
                <button
                  class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
                  onclick={() => share()}
                >
                  Copy link to clipboard
                </button>
              </div>
              <h2 class="my-4 text-xl md:text-3xl text-white font-bold leading-tight">
                Select your estimate
              </h2>

              <div class="grid grid-cols-1 divide-y space-y-8 divide-white max-w-md">
                <div class={`${voted() ? "opacity-75" : ""}`}>
                  {room().options.values.map((option) => (
                    <button
                      onClick={() => vote(option)}
                      class="bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 hover:to-red-400 hover:via-red-400 text-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {owner() && (
                  <div class="pt-6 flex">
                    <button
                      onClick={reset}
                      class="m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Reset
                    </button>
                    <button
                      onClick={toggleRevealed}
                      disabled={selectedEstimates().length === 0}
                      class={`${
                        !selectedEstimates().length
                          ? "opacity-75 cursor-not-allowed"
                          : ""
                      } m-1 text-md py-1 px-4 rounded-md ring-1 ring-pink-400 bg-pink-500 hover:bg-pink-700 text-white`}
                    >
                      {room().revealed ? "Hide" : "Reveal"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div class="flex-grow-0 md:px-4 md:mx-16 max-w-lg">
              <h2 class="my-4 text-xl md:text-3xl text-white font-bold leading-tight">
                Team estimates
              </h2>
              <div
                class={`flex flex-wrap ${!room().revealed ? "opacity-75" : ""}`}
              >
                {selectedEstimates().map((estimate) => (
                  <div class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500  text-white">
                    {room().revealed ? estimate.value : "?"}
                  </div>
                ))}

                {missingOptions() > 0 &&
                  [...Array(missingOptions()).keys()].map((missingEstimate) => {
                    return (
                      <div class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md border-2 border-purple-400 border-dashed 0  text-white" />
                    );
                  })}
              </div>
              <p class="mt-4 text-white font-bold">
                Average: {room().revealed ? average : "?"}
              </p>
            </div>
          </div>
          <div class="my-6">
            <h2 class="text-xl md:text-3xl text-white font-bold leading-tight">
              Team members ({room().membersInfo.length})
            </h2>
            <ul class="flex py-4 pl-2 flex-col text-white list-disc ml-3">
              {room().membersInfo.map((member) => (
                <li>
                  <p>
                    {member.name} - {member.voted ? "Voted" : "Pending"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
