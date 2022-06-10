<script>
  import { slide } from "svelte/transition";
  import TextArea from "./TextAreaAutosize.svelte";
  export let pushItem;
  let itemName;
  let itemDescription;
  let show;

  function addCard() {
    pushItem(itemName, itemDescription);
    show = false;
    itemName = "";
    itemDescription = "";
  }
</script>

<div class="mt-4 text-gray-800">
  <div
    on:drag={(e) => e.preventDefault()}
    class="w-full rounded overflow-hidden shadow-lg bg-white mb-2 p-4 max-w-sm"
  >
    <div class="flex">
      <button
        class="w-full flex text-sm items-center"
        on:click={() => (show = !show)}
      >
        Add new item

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {#if !show}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 12H6"
            />
          {/if}
        </svg>
      </button>
    </div>
    {#if show}
      <div transition:slide|local class="mt-2">
        <div>
          <label
            class="block text-gray-800 text-sm font-bold mb-1"
            for="inline-full-name"
          >
            Name
          </label>
          <input
            bind:value={itemName}
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
          />
        </div>
        <div class="mt-2">
          <label
            class="block text-gray-800 text-sm font-bold mb-1"
            for="inline-full-name"
          >
            Description
          </label>

          <TextArea bind:value={itemDescription} minRows={4} maxRows={40} />
        </div>
        <div class="flex">
          <button
            on:click={() => addCard()}
            class="ml-auto mt-2 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
            >Add card</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>
