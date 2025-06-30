<script setup lang="ts">
  import type { Socket } from "socket.io-client";
  import initSocket from "@/lib/socket";
  import { TailwindColor } from "@/utils/color";
  const route = useRoute();

  const colors = new TailwindColor("#f00");
  let roomId = route.params.id[0];
  let socket: Socket;
  const isConnected = useState("isConnected", () => false);
  const joined = useState("joined", () => false);
  const expired = useState("expired", () => false);
  const voted = useState("voted", () => false);
  const owner = useState("owner", () => false);

  const room = useState("room", () => {
    return {
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
  });

  onBeforeMount(() => {
    socket = initSocket({
      roomId,
      onConnect: () => {
        isConnected.value = true;
      },
      onUpdated: (event) => {
        room.value = event.data;
      },
      onJoined: () => {
        joined.value = true;
      },
      onExpired: () => {
        expired.value = true;
      },
    });
  });

  onUpdated(() => {
    if (room.value.members.length === 1) {
      owner.value = true;
    }
  });

  onUnmounted(() => {
    socket?.close();
  });

  onUpdated(() => {
    selectedEstimates.value = room.value.selectedOptions.sort(
      (a, b) => a.value - b.value
    );

    average.value = selectedEstimates.value.length
      ? (
          selectedEstimates.value.reduce((a, b) => a + b.value, 0) /
          selectedEstimates.value.length
        ).toFixed(2)
      : 0;

    missingOptions.value =
      room.value.members.length - selectedEstimates.value.length;
  });

  let selectedEstimates = useState("selectedEstimates", () =>
    room.value.selectedOptions.sort((a, b) => a.value - b.value)
  );
  let average = useState("average", () =>
    selectedEstimates.value.length
      ? (
          selectedEstimates.value.reduce((a, b) => a + b.value, 0) /
          selectedEstimates.value.length
        ).toFixed(2)
      : 0
  );
  let missingOptions = useState(
    "missingOptions",
    () => room.value.members.length - selectedEstimates.value.length
  );

  let toggleRevealed = () => {
    socket.emit("events", { type: "reveal", payload: { id: roomId } });
  };

  let reset = () => {
    socket.emit("events", { type: "reset", payload: { id: roomId } });
    voted.value = false;
  };

  let vote = (option: number) => {
    voted.value = true;
    socket.emit("events", { type: "vote", payload: { id: roomId, option } });
  };

  let selectOption = (selectedOption) => {
    socket.emit("events", {
      type: "options",
      payload: { id: roomId, option: selectedOption },
    });
  };

  let share = () => {
    navigator.clipboard.writeText(window.location.href);
  };
</script>

<template>
  <div class="w-full py-6 px-6 md:px-0">
    <template v-if="!isConnected">
      <div class="flex flex-col items-center justify-center">
        <div
          style="border-top-color: transparent"
          class="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
        />
        <p class="text-white text-xl mt-4">Connecting to the room</p>
      </div>
    </template>
    <template v-else>
      <div>
        <template v-if="expired">
          <div class="flex mb-4">
            <p
              class="px-2 py-1 border bg-red-800 border-red-400 rounded-md text-white"
            >
              Room expired. Please reload the page.
            </p>
          </div>
        </template>
        <div class="flex flex-col md:flex-row">
          <div class="w-full max-w-md">
            <div class="flex items-center">
              <h1 class="text-md text-white leading-tight inline-block">
                Welcome to your room.
              </h1>
              <Button
                _class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
                :onclick="() => share()"
                tooltip="Copied"
                >Share</Button
              >
            </div>
            <h2
              class="my-4 text-xl md:text-3xl text-white font-bold leading-tight"
            >
              Select your estimate
            </h2>

            <div
              class="grid grid-cols-1 divide-y space-y-8 divide-white max-w-md"
            >
              <div :class="voted ? 'opacity-75' : ''">
                <template
                  v-for="(option, index) in room.options.values"
                  v-bind:key="index"
                >
                  <button
                    @click="() => vote(option)"
                    class="bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 hover:to-red-400 hover:via-red-400 text-white"
                  >
                    {{ option }}
                  </button>
                </template>
              </div>
              <template v-if="owner">
                <div class="pt-6 flex">
                  <button
                    @click="() => reset()"
                    class="m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Reset
                  </button>
                  <button
                    @click="() => toggleRevealed()"
                    :disabled="selectedEstimates.length === 0"
                    :class="
                      !selectedEstimates.length
                        ? 'opacity-75 cursor-not-allowed'
                        : ''
                    "
                    class="m-1 text-md py-1 px-4 rounded-md ring-1 ring-pink-400 bg-pink-500 hover:bg-pink-700 text-white"
                  >
                    {{ room.revealed ? "Hide" : "Reveal" }}
                  </button>
                  <Select
                    :selectedOption="room.options.label"
                    :onSelected="(selectedOption) => selectOption(selectedOption)"
                  />
                </div>
              </template>
            </div>
          </div>

          <div class="flex-grow-0 md:px-4 md:mx-16 max-w-lg">
            <h2
              class="my-4 text-xl md:text-3xl text-white font-bold leading-tight"
            >
              Team estimates
            </h2>
            <div
              class="flex flex-wrap"
              :class="!room.revealed ? 'opacity-75' : ''"
            >
              <template
                v-for="(estimate, index) in selectedEstimates"
                :key="index"
              >
                <div
                  class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 text-white"
                >
                  {{ room.revealed ? estimate.value : "?" }}
                </div>
              </template>
              <template v-if="missingOptions > 0">
                <template
                  v-for="(missingEstimate, index) in [
                    ...Array(missingOptions).keys(),
                  ]"
                  :key="index"
                >
                  <div
                    class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md border-2 border-purple-400 border-dashed 0 text-white"
                  />
                </template>
              </template>
            </div>
            <p class="mt-4 text-white font-bold">
              Average: {{ room.revealed ? average : "?" }}
            </p>
          </div>
        </div>
        <div class="my-6">
          <h2 class="text-xl md:text-3xl text-white font-bold leading-tight">
            Team members ({{ room.members.length }})
          </h2>
          <div class="flex -space-x-4 overflow-hidden py-4 pl-2 -ml-3">
            <template
              v-for="(member, index) in room.members"
              v-bind:key="index"
            >
              <div
                class="m-1 border border-white w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                :class="colors.pick()"
              >
                {{ member.charAt(0) }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
