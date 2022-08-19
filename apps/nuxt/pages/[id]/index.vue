<script lang="ts">
  import type { Socket } from "socket.io-client";
  import Button from "@/components/ui/Button.vue";
  import Select from "@/components/ui/Select.vue";
  import Badge from "@/components/ui/Badge.vue";
  import initSocket from "@/lib/socket";

  let roomId;
  let socket: Socket;
  let isConnected = false;
  let joined = false;
  let expired = false;
  let voted = false;
  let room = {
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
  let name = "";

  let selectedEstimates = room.selectedOptions.sort(
    (a, b) => a.value - b.value
  );
  let average = selectedEstimates.length
    ? (
        selectedEstimates.reduce((a, b) => a + b.value, 0) /
        selectedEstimates.length
      ).toFixed(2)
    : 0;
  let owner = socket && socket.id === room.owner;
  let missingOptions = room.members.length - selectedEstimates.length;

  function toggleRevealed() {
    socket.emit("events", { type: "reveal", payload: { id: roomId } });
  }

  function reset() {
    socket.emit("events", { type: "reset", payload: { id: roomId } });
    voted = false;
  }

  function vote(option: number) {
    voted = true;
    socket.emit("events", { type: "vote", payload: { id: roomId, option } });
  }

  function selectOption(selectedOption) {
    socket.emit("events", {
      type: "options",
      payload: { id: roomId, option: selectedOption },
    });
  }

  function updateName(newName: string) {
    console.log(newName);
    socket.emit("events", {
      type: "update_name",
      payload: { id: roomId, newName },
    });
    joined = true;
    console.log(joined);
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
  }

  function close() {
    socket?.close();
  }

  export default {
    room: "Room",
    data() {
      return {
        roomId,
        isConnected,
        joined,
        expired,
        name,
        average,
        owner,
        missingOptions,
        voted,
        selectedEstimates,
        room,
      };
    },
    methods: {
      share,
      updateName,
      selectOption,
      vote,
      reset,
      toggleRevealed,
      close,
    },
    components: {
      Button,
      Select,
      Badge,
    },
    mounted() {
      let route = useRoute();
      roomId = route.params.id;

      socket = initSocket({
        roomId,
        onConnect: () => {
          isConnected = true;
        },
        onUpdated: (event) => {
          room = event.data;
        },
        onJoined: () => {
          joined = true;
        },
        onExpired: () => {
          expired = true;
        },
      });
      console.log(socket, roomId, isConnected, joined);
    },
    unmounted() {
      close();
    },
  };
</script>

<template>
  <div class="w-full py-6 px-6 md:px-0">
    <div v-if="!isConnected">
      <div class="flex flex-col items-center justify-center">
        <div
          style="border-top-color: transparent"
          class="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
        />
        <p class="text-white text-xl mt-4">Connecting to the room</p>
      </div>
    </div>
    <div v-else>
      <div>
        <div v-if="expired">
          <div class="flex mb-4">
            <p
              class="px-2 py-1 border bg-red-800 border-red-400 rounded-md text-white"
            >
              Room expired. Please reload the page.
            </p>
          </div>
        </div>
        <div v-if="!joined">
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />

            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div
                class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
              >
                <div
                  class="relative bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"
                >
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
                          v-model="name"
                          class="p-2 text-black shadow-sm focus:ring-pink-700 focus:outline-none border-pink-500 border focus:border-pink-700 block w-full sm:text-sm rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button
                      type="button"
                      v-on:click="updateName(name)"
                      class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Join the room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row">
          <div class="w-full max-w-md">
            <div class="flex items-center">
              <h1 class="text-md text-white leading-tight inline-block">
                Welcome {{ name }} to your room.
              </h1>
              <Button
                _class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
                v-on:click="share()"
                tooltip="Copied"
                >Share
              </Button>
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
                <div v-for="option in room.options.values">
                  <button
                    v-on:click="vote(option)"
                    class="bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 hover:to-red-400 hover:via-red-400 text-white"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>

              <div v-if="owner">
                <div class="pt-6 flex">
                  <button
                    v-on:click="reset()"
                    class="m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Reset
                  </button>
                  <button
                    v-on:click="toggleRevealed()"
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
                    :onSelected="selectOption"
                  />
                </div>
              </div>
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
              <div v-for="estimate in selectedEstimates">
                <div
                  class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 text-white"
                >
                  {{ room.revealed ? estimate.value : "?" }}
                </div>
              </div>

              <div v-if="missingOptions > 0">
                <div
                  v-for="missingEstimate in [...Array(missingOptions).keys()]"
                >
                  <div
                    class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md border-2 border-purple-400 border-dashed 0 text-white"
                  />
                </div>
              </div>
            </div>
            <p class="mt-4 text-white font-bold">
              Average: {{ room.revealed ? average : "?" }}
            </p>
          </div>
        </div>
        <div class="my-6">
          <h2 class="text-xl md:text-3xl text-white font-bold leading-tight">
            Team members ({{ room.membersInfo.length }})
          </h2>
          <ul class="flex py-4 pl-2 flex-col text-white list-disc ml-3">
            <div v-for="member in room.membersInfo">
              <li>
                <p>
                  {{ member.name }} -
                  <Badge :type="member.voted ? 'success' : 'warning'">{{
                    member.voted ? "Voted" : "Pending"
                  }}</Badge>
                </p>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
