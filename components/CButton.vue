<template>
  <button class="border hover:bg-grey-light px-4 py-2 rounded c-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.c-button {
  transition: background 0.2s ease;
}
</style>
