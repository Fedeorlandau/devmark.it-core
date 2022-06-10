<script lang="ts">
  import { io } from "socket.io-client";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import { TailwindColor } from "@utils/color";
  import { onMount, onDestroy } from "svelte";
  import { variables } from "@lib/variables";
  import Button from "@ui/Button.svelte";
  import Select from "@ui/Select.svelte";

  const colors = new TailwindColor("#f00");
  let roomId;
  let socket;
  let isConnected = false;
  let room = {
    owner: "",
    options: {
      id: 0,
      label: "Fibonacci",
      values: [],
    },
    members: [],
    selectedOptions: [],
    revealed: false,
  };
  let expired = false;
  page.subscribe((p) => (roomId = p.params.id));

  onMount(() => {
    socket = io(variables.wsUrl);

    socket.on("connect", function () {
      socket.emit("events", { type: "join", payload: { id: roomId } });
      isConnected = true;
    });

    socket.on("updated", function (event) {
      room = event.data;
    });

    socket.on("exception", function (data) {
      console.log("event", data);
    });

    socket.on("expire", function () {
      expired = true;
      socket.close();
    });
  });

  onDestroy(() => {
    if (socket) {
      socket.close();
    }
  });

  $: options = room.options;
  $: selectedEstimates = room.selectedOptions;
  $: members = room.members;
  $: revealed = room.revealed;
  $: owner = socket && socket.id === room.owner;
  $: missingOptions = members.length - selectedEstimates.length;
  $: selectedOption = room.options.label;

  $: average = selectedEstimates.length
    ? (
        selectedEstimates.reduce((a, b) => a + b.value, 0) /
        selectedEstimates.length
      ).toFixed(2)
    : 0;
  let voted = false;

  let toggleRevealed = () => {
    socket.emit("events", { type: "reveal", payload: { id: roomId } });
  };

  let reset = () => {
    socket.emit("events", { type: "reset", payload: { id: roomId } });
    voted = false;
  };

  let vote = (option: number) => {
    voted = true;
    socket.emit("events", { type: "vote", payload: { id: roomId, option } });
  };

  let share = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  let selectOption = (selectedOption) => {
    console.log(selectedOption);
    socket.emit("events", {
      type: "options",
      payload: { id: roomId, option: selectedOption },
    });
  };
</script>

<div class="w-full py-6 px-6 md:px-0">
  {#if !isConnected}
    <div class="flex flex-col items-center justify-center">
      <div
        style="border-top-color:transparent"
        class="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
      />
      <p class="text-white text-xl mt-4">Connecting to the room</p>
    </div>
  {:else}
    <div transition:fade|local|>
      {#if expired}
        <div class="flex mb-4">
          <p
            class="px-2 py-1 border bg-red-800 border-red-400 rounded-md text-white"
          >
            Room expired. Please reload the page.
          </p>
        </div>
      {/if}
      <div class="flex flex-col md:flex-row">
        <div class="w-full max-w-md">
          <div class="flex items-center">
            <h1 class="text-md text-white leading-tight inline-block">
              Welcome to your room.
            </h1>
            <Button
              _class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
              onclick={() => share()}
              tooltip="Copied">Share</Button
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
            <div class={`${voted ? "opacity-75" : ""}`}>
              {#each options.values as option}
                <button
                  on:click={() => vote(option)}
                  class="
                              bg-white m-1 text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500 hover:to-red-400 hover:via-red-400 text-white"
                  >{option}</button
                >
              {/each}
            </div>

            {#if owner}
              <div class="pt-6 flex">
                <button
                  on:click={reset}
                  class="m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
                  >Reset</button
                >
                <button
                  on:click={toggleRevealed}
                  disabled={selectedEstimates.length === 0}
                  class={`${
                    !selectedEstimates.length
                      ? "opacity-75 cursor-not-allowed"
                      : ""
                  } m-1 text-md py-1 px-4 rounded-md ring-1 ring-pink-400 bg-pink-500 hover:bg-pink-700 text-white`}
                  >{revealed ? "Hide" : "Reveal"}</button
                >
                <Select {selectedOption} onSelected={selectOption} />
              </div>
            {/if}
          </div>
        </div>

        <div class="flex-grow-0 md:px-4 md:mx-16 max-w-lg">
          <h2
            class="my-4 text-xl md:text-3xl text-white font-bold leading-tight"
          >
            Team estimates
          </h2>
          <div class={`flex flex-wrap ${!revealed ? "opacity-75" : ""}`}>
            {#each selectedEstimates as estimate}
              <div
                class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md ring-1 ring-purple-400 bg-gradient-to-b from-red-400 to-pink-500  text-white"
              >
                {revealed ? estimate.value : "?"}
              </div>
            {/each}

            {#if missingOptions > 0}
              {#each [...Array(missingOptions).keys()] as missingEstimate}
                <div
                  class="flex m-1 justify-center items-center text-2xl h-20 w-14 rounded-md border-2 border-purple-400 border-dashed 0  text-white"
                />
              {/each}
            {/if}
          </div>
          <p class="mt-4 text-white font-bold">
            Average: {revealed ? average : "?"}
          </p>
        </div>
      </div>
      <div class="my-6">
        <h2 class="text-xl md:text-3xl text-white font-bold leading-tight">
          Team members ({members.length})
        </h2>
        <div class="flex -space-x-4 overflow-hidden py-4 pl-2 -ml-3">
          {#each members as member}
            <div
              class={`m-1 border border-white w-12 h-12 relative flex justify-center items-center rounded-full ${colors.pick()} text-xl text-white uppercase`}
            >
              {member.charAt(0)}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
