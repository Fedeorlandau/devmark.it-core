<script lang="ts">
  type BadgeType = "success" | "warning" | "danger";
  export let type: BadgeType;

  let badgeClass = "";

  $: {
    if (type === "success") {
      badgeClass = "badge__success";
    } else if (type === "warning") {
      badgeClass = "badge__warning";
    } else if (type === "danger") {
      badgeClass = "badge__danger";
    }
  }
</script>

<span class={`badge ${badgeClass}`}><slot /></span>

<style lang="postcss">
  .badge {
    @apply text-xs font-semibold mr-2 px-2.5 py-0.5 rounded;
  }

  .badge__success {
    @apply bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900;
  }

  .badge__warning {
    @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900;
  }

  .badge__danger {
    @apply bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900;
  }
</style>
