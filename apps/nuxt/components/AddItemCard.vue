<script setup lang="ts">
  interface AddItemCardProps {
    pushItem: (name: string, description: string) => void;
  }

  const AddItemCardProps = defineProps<AddItemCardProps>();

  let showAddItemCard: boolean;
  let itemName: string;
  let itemDescription: string;

  const addCard = () => {
    AddItemCardProps.pushItem(itemName, itemDescription);
    showAddItemCard = false;
    itemName = "";
    itemDescription = "";
  };
</script>

<template>
  <div class="mt-4 text-gray-800">
    <div
      @drag.prevent
      class="w-full rounded overflow-hidden shadow-lg bg-white mb-2 p-4 max-w-sm"
    >
      <div class="flex">
        <button
          class="w-full flex text-sm items-center"
          @click="() => (showAddItemCard = !showAddItemCard)"
        >
          Add new item

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <template v-if="!showAddItemCard">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </template>
            <template v-else>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 12H6"
              />
            </template>
          </svg>
        </button>
      </div>
      <template v-if="showAddItemCard">
        <div class="mt-2">
          <div>
            <label
              class="block text-gray-800 text-sm font-bold mb-1"
              for="inline-full-name"
            >
              Name
            </label>
            <input
              v-model="itemName"
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

            <TextAreaAutoSize
              :value="itemDescription"
              :minRows="4"
              :maxRows="40"
            />
          </div>
          <div class="flex">
            <button
              @click="() => addCard()"
              class="ml-auto mt-2 text-md py-1 px-4 rounded-md ring-1 ring-purple-600 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Add card
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
