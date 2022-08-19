<script></script>

<template>
  <div class="flex items-center mb-4">
    <h1 class="text-md text-white font-bold leading-tight inline-block">
      Welcome to your board.
    </h1>
    <Button
      _class="p-0 leading-none ml-1 inline-block underline decoration-purple-500 decoration-2 text-white font-bold underline-offset-2"
      tooltip="Copied"
      >Share</Button
    >
  </div>
  <Board columns="{columnsData}" onFinalUpdate="{handleBoardUpdated}" />
</template>
