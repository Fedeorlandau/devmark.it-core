<script setup lang="ts">
  interface SelectProps {
    onSelected: (value: any) => void;
    selectedOption: string;
  }

  const SelectProps = defineProps<SelectProps>();

  const show = useState("show", () => false);
  let menu = ref(null); // menu wrapper DOM reference

  let selectOption = (id: number) => {
    SelectProps.onSelected(id);
    show.value = false;
  };

  onMounted(() => {

    const handleClickOutside = (e) => {
      if (menu.value && !menu.value.contains(e.target)) {
        show.value = false;
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (show.value && event.key === "Escape") {
        show.value = false;
      }
    };

    // add events when element is added to the DOM
    document.addEventListener("click", handleClickOutside, false);
    document.addEventListener("keyup", handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("keyup", handleEscape, false);
    };
  });
</script>

<template>
  <div class="relative" ref="menu">
    <div>
      <button
        @click="() => (show = !show)"
        class="menu flex items-center focus:shadow-solid bg-transparent m-1 text-md py-1 px-4 rounded-md ring-1 ring-purple-400 hover:bg-purple-700 text-white"
      >
        {{ selectedOption }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <template v-if="show">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </template>
          <template v-else>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </template>
        </svg>
      </button>

      <template v-if="show">
        <div
          class="origin-top-right absolute right-0 w-48 p-px mt-1 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded shadow-md text-white"
        >
          <div class="bg-black rounded p-1 divide-y divide-purple-400">
            <button
              class="w-full px-4 py-2 hover:bg-gray-800 hover:text-green-100"
              @click="() => selectOption(0)"
            >
              Fibonacci
            </button>
            <button
              class="w-full px-4 py-2 hover:bg-gray-800 hover:text-green-100"
              @click="() => selectOption(1)"
            >
              Sequential
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
