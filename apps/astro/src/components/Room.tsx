import type { Socket } from "socket.io-client";
import { createSignal, onCleanup, onMount } from "solid-js";
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

  onMount(() => {
    console.log("mounting");
    const s = initSocket({
      roomId,
      onConnect: () => {
        setIsConnected(true);
      },
      onUpdated: (event) => {
        console.log(event.data);
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
    </div>
  );
}
