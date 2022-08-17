<script lang="ts">
  import { goto } from "$app/navigation";

  function getSixDigitRandom() {
    return Math.random().toString().substring(2, 8);
  }

  let createRoom = (isPrivate?: boolean) => {
    goto(`/${isPrivate ? "private/" : ""}${getSixDigitRandom()}`);
  };

  let createDashboard = () => {
    goto(`/board/${getSixDigitRandom()}`);
  };
</script>

<div class="flex flex-col w-full py-6 px-6 md:px-0 text-white">
  <h1 class="my-4 text-3xl md:text-5xl text-white font-bold leading-tight">
    Start estimating your next feature.
  </h1>
  <p class="leading-normal text-base md:text-xl mb-8 ">
    Create a room and share the link with your team.
  </p>

  <div class=" w-full shadow-lg rounded-lg mb-4">
    <div class="flex items-center justify-between">
      <button
        class="text-lg bg-gradient-to-r from-red-400 via-pink-500 to-purple-500  hover:via-pink-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded focus:ring"
        type="button"
        on:click={() => createRoom()}
      >
        Create a room
      </button>
    </div>
  </div>
  <div class="mt-2">
    <p>
      If you don't care about people's name <button
        class="underline decoration-pink-500 decoration-2 font-bold underline-offset-2"
        on:click={() => createRoom(true)}>Create a private room</button
      >
    </p>
  </div>
  <div
    class="hidden my-4 md:my-8 bg-gradient-to-r font-bold from-red-400 via-pink-500 to-purple-500 h-0.5"
  />
  <div class="hidden">
    <h2
      class="text-xl md:text-3xl text-white font-bold leading-tight text-center"
    >
      We're working on a live collaborative dashboard. <button
        class="text-transparent bg-gradient-to-r font-bold from-red-400 via-pink-500 to-purple-500 bg-clip-text underline"
        on:click={createDashboard}>Try it now</button
      >
    </h2>
  </div>
  <div
    class="hidden my-4 md:my-8 bg-gradient-to-r font-bold from-red-400 via-pink-500 to-purple-500 h-0.5"
  />
  <div class="mt-2">
    <h2 class="my-4 text-xl text-white font-bold leading-tight ">
      How to support the project?
    </h2>
    <p class="leading-normal text-base mb-8 text-white">
      Simply <a
        href="https://www.buymeacoffee.com/fedeorlandau"
        target="blank"
        class="underline decoration-purple-500 decoration-2 font-bold underline-offset-2"
        >buy me a coffee</a
      >.
    </p>
  </div>
</div>

<!--Right Col-->
<div class="w-full xl:w-2/5 p-12 overflow-hidden" />
