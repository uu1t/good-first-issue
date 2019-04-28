<template>
  <button class="c-button border hover:bg-grey-light inline-flex items-center px-4 py-2 rounded">
    <slot></slot>
  </button>
</template>

<style scoped>
.c-button {
  transition: background 0.2s ease;
}
</style>
