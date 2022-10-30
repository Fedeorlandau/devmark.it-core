<script setup lang="ts">
  type BadgeType = "success" | "warning" | "danger";

  interface BadgeProps {
    type: BadgeType;
  }

  const BadegeProps = defineProps<BadgeProps>();

  let badgeClass = useState("badgeClass", () => "");

  function switchClass() {
    switch (BadegeProps.type) {
      case "success":
        badgeClass.value = "badge__success";
        break;
      case "warning":
        badgeClass.value = "badge__warning";
        break;
      case "danger":
        badgeClass.value = "badge__danger";
        break;
    }
  }

  onMounted(() => {
    switchClass();
  });

  onUpdated(() => {
    switchClass();
  });
</script>

<template>
  <span class="badge" :class="badgeClass"><slot /></span>
</template>

<style>
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
