<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import newUniqueId from "$lib/uniqueId";

  import AddItemCard from "../AddItemCard.svelte";
  import Card from "../Card.svelte";

  const flipDurationMs = 150;
  export let name;
  export let items;
  export let onDrop;
  export let columnColor;
  export let borderColor;

  function pushItem(itemName, itemDescription) {
    items = [
      ...items,
      { name: itemName, id: newUniqueId(), description: itemDescription },
    ];
  }

  function handleDndConsiderCards(e) {
    console.warn("got consider", name);
    items = e.detail.items;
  }
  function handleDndFinalizeCards(e) {
    onDrop(e.detail.items);
  }
</script>

<div class="wrapper bg-gray-900 p-4 rounded-md">
  <div class={`${columnColor} font-bold text-center`}>
    {name}
  </div>
  <div
    class={`column-content p-2 h-full mt-4 border-dashed rounded-md border-2 pb-0 ${borderColor}`}
    use:dndzone={{
      items,
      flipDurationMs,
      zoneTabIndex: -1,
      dropTargetStyle: {},
    }}
    on:consider={handleDndConsiderCards}
    on:finalize={handleDndFinalizeCards}
  >
    {#each items as item (item.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <Card {item} />
      </div>
    {/each}
  </div>
  <AddItemCard {pushItem} />
</div>

<style>
  .wrapper {
    height: 100%;
    width: 100%;
    /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
    overflow-y: hidden;
  }

  .column-content {
    height: auto;
    min-height: 200px;
  }
</style>
