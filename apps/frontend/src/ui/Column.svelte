<script>
  export let ref;
  export let handleDragEnter;
  export let handleDragLeave;
  export let handleDragDrop;
</script>

<div
  class="rounded bg-gray-700 max-w-md w-full p-2 text-white"
  bind:this={ref}
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  on:drop={handleDragDrop}
  ondragover="return false"
>
  <div class="flex justify-between py-1">
    <h3 class="text-sm">New landing page</h3>
    <svg
      class="h-4 fill-current text-grey-dark cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><path
        d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
      /></svg
    >
  </div>
  <div class="text-sm mt-2">
    <slot />
    <p class="mt-3 text-grey-dark">Add a card...</p>
  </div>
</div>
