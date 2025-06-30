<script setup lang="ts">
  interface TextAreaAutoSizeProps {
    value?: string;
    minRows: number;
    maxRows: number;
  }

  const TextAreaAutoSizeProps = defineProps<TextAreaAutoSizeProps>();

  let minHeight = `${1 + TextAreaAutoSizeProps.minRows * 1.2}em`;
  let maxHeight = TextAreaAutoSizeProps.maxRows
    ? `${1 + TextAreaAutoSizeProps.maxRows * 1.2}em`
    : `auto`;
</script>

<template>
  <div>
    <div class="container">
      <pre
        aria-hidden="true"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        style="min-height: minHeight; max-height: maxHeight"
        >{{ value + "\n" }}</pre
      >

      <textarea
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        bind:value
      />
    </div>
  </div>
</template>

<style>
  .container {
    position: relative;
  }

  pre,
  textarea {
    font-family: inherit;
    box-sizing: border-box;
    line-height: 1.2;
    overflow: hidden;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
  }
</style>
