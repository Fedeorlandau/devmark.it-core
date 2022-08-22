<script setup lang="ts">
  import newUniqueId from "@/lib/uniqueId";
  import { Item } from "./Card.vue";

  const flipDurationMs = 150;

  interface ColumnProps {
    name: string;
    items: Item[];
    columnColor: string;
    borderColor: string;
    onDrop: (newItems: Item[]) => void;
  }

  const ColumnProps = defineProps<ColumnProps>();

  const pushItem = (itemName: string, itemDescription: string) => {
    ColumnProps.items.push({
      name: itemName,
      id: newUniqueId(),
      description: itemDescription,
    });
  };
</script>

<template>
  <div class="wrapper bg-gray-900 p-4 rounded-md">
    <div class="font-bold text-center" :class="columnColor">
      {{ name }}
    </div>
    <div
      class="column-content p-2 h-full mt-4 border-dashed rounded-md border-2 pb-0"
      :class="borderColor"
    >
      <div v-for="item in items" v-bind:key="item.id">
        <Card :item="item" />
      </div>
    </div>
    <AddItemCard :pushItem="() => pushItem(name, '')" />
  </div>
</template>

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
