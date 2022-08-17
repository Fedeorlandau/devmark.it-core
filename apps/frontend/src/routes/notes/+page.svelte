<script>
  import { onMount } from "svelte";
  onMount(() => {
    new Quill("#editor", {
      theme: "snow",
      class: "devmark-editor",
    });
  });
</script>

<div class="notes rounded-md text-white">
  <div id="editor">
    <p>Hello World!</p>
    <p>Some initial <strong>bold</strong> text</p>
    <p><br /></p>
  </div>
</div>

<style>
  #editor {
    @apply bg-gray-800 border-0 rounded-b;
  }
</style>
