<script>
  import Column from "./Column.svelte";
  const flipDurationMs = 300;

  export let columns;
  // will be called any time a card or a column gets dropped to update the parent data
  export let onFinalUpdate;

  function handleDndFinalizeColumns(e) {
    onFinalUpdate(e.detail.items);
  }
  function handleItemFinalize(columnIdx, newItems) {
    columns[columnIdx].items = newItems;
    onFinalUpdate([...columns]);
  }
</script>

<section class="board max-h-screen flex space-x-2 justify-center">
  {#each columns as { id, name, items, columnColor, borderColor }, idx (id)}
    <div class="h-full min-w-sm w-full max-w-sm float-left">
      <Column
        {name}
        {items}
        {columnColor}
        {borderColor}
        onDrop={(newItems) => handleItemFinalize(idx, newItems)}
      />
    </div>
  {/each}
</section>

<style>
  .board {
    height: 100%;
    width: 100%;
    padding: 0.5em;
  }
</style>
