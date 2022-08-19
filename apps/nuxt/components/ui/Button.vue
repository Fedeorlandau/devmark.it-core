<script lang="ts">
  export let _class;
  export let onclick;
  export let tooltip;
  let showTooltip = false;

  function click() {
    if (onclick) {
      onclick();
      if (tooltip) {
        showTooltip = true;
        setTimeout(() => {
          showTooltip = false;
        }, 1000);
      }
    }
  }

  export default {
    name: "Button",
    data() {
      return {
        showTooltip,
        _class,
      };
    },
    methods: {
      click,
    },
  };
</script>

<template>
  <button :class="_class" @click="click">
    <slot />
  </button>

  <div v-if="showTooltip" :data-tooltip="tooltip" />
</template>

<style>
  [data-tooltip] {
    position: relative;
    z-index: 2;
    display: block;
  }

  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: none;
    transition: 0.2s ease-out;
  }

  [data-tooltip]:before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 5px;
    padding: 7px;
    width: 100%;
    min-width: 70px;
    max-width: 250px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
    transition: 0.2s ease-out;
  }

  [data-tooltip]:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  [data-tooltip="false"]:before,
  [data-tooltip="false"]:after {
    visibility: hidden;
    opacity: 0;
  }
</style>
