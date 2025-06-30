<script setup lang="ts">
  export interface Item {
    id: string;
    description?: string;
    name?: string;
  }

  interface CardProps {
    item: Item;
  }

  const CardProps = defineProps<CardProps>();

  let item: Item;

  let description = CardProps.item.description;
  let name = CardProps.item.name;

  let isEditMode = false;

  const toggleEditMode = () => {
    isEditMode = !isEditMode;
  };

  const save = () => {
    item.description = description;
    item.name = name;
    isEditMode = false;
  };
</script>

<template>
  <div class="w-full rounded overflow-hidden shadow-lg bg-white mb-2">
    <div class="p-4">
      <div class="float-right">
        <button @click="() => toggleEditMode()" class="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>
      <div class="text-xs text-gray-500">
        <p>{{ item.id }}</p>
      </div>
      <template v-if="isEditMode">
        <div class="mt-2">
          <label
            class="block text-gray-800 text-sm font-bold mb-1"
            for="inline-full-name"
          >
            Name
          </label>
          <input
            v-model="name"
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

          <TextAreaAutoSize :value="description" :minRows="4" :maxRows="40" />
        </div>
        <div class="flex">
          <button
            @click="() => toggleEditMode()"
            class="ml-auto bg-white mt-2 text-md py-1 px-4 rounded-md ring-1 border border-purple-400 ring-purple-400 text-purple-400"
          >
            Cancel
          </button>
          <button
            @click="() => save()"
            class="ml-2 bg-white mt-2 text-md py-1 px-4 rounded-md ring-1 ring-purple-400 bg-purple-500 hover:bg-purple-700 text-white"
          >
            Save
          </button>
        </div>
      </template>
      <template v-else>
        <div class="font-bold text-xl text-black">
          <p class="max-w-sm">{item.name}</p>
        </div>
        <template v-if="item.description">
          <p class="text-gray-700 text-base">
            {{ item.description }}
          </p>
        </template>
      </template>
    </div>
  </div>
</template>
