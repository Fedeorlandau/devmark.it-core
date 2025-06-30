<script setup lang="ts">
  interface BoardProps {
    columns: any;
    onFinalUpdate: (event: any[]) => void;
  }

  const BoardProps = defineProps<BoardProps>();

  const flipDurationMs = 300;
  // will be called any time a card or a column gets dropped to update the parent data

  function handleDndFinalizeColumns(e) {
    BoardProps.onFinalUpdate(e.detail.items);
  }
  function handleItemFinalize(columnIdx, newItems) {
    BoardProps.columns[columnIdx].items = newItems;
    BoardProps.onFinalUpdate([...BoardProps.columns]);
  }
</script>

<template>
  <section class="board max-h-screen flex space-x-2 justify-center">
    <div
      v-for="(column, index) in columns"
      v-bind:key="index"
      class="h-full min-w-sm w-full max-w-sm float-left"
    >
      <Column
        :name="column.name"
        :items="column.items"
        :columnColor="column.columnColor"
        :borderColor="column.borderColor"
        :onDrop="(newItems) => handleItemFinalize(index, newItems)"
      />
    </div>
  </section>
</template>

<style>
  .board {
    height: 100%;
    width: 100%;
    padding: 0.5em;
  }
</style>
