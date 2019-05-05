<template>
  <div class="flex justify-center mb-4">
    <button
      :disabled="!hasPreviousPage"
      class="p-pagination__link border hover:bg-grey-light hover:text-blue-darker inline-flex items-center p-2 rounded-l text-blue-dark"
      @click="$emit('click:navigate-first')"
    >
      <CIcon name="chevron-doulbe-left" :margin-right="false" />
    </button>
    <button
      :disabled="!hasPreviousPage"
      class="p-pagination__link border-t border-r border-b hover:bg-grey-light hover:text-blue-darker inline-flex items-center mr-8 p-2 rounded-r text-blue-dark"
      @click="$emit('click:navigate-previous')"
    >
      <CIcon name="chevron-left" :margin-right="false" />
    </button>
    <button
      :disabled="!hasNextPage"
      class="p-pagination__link border hover:bg-grey-light hover:text-blue-darker inline-flex items-center p-2 rounded text-blue-dark"
      @click="$emit('click:navigate-next')"
    >
      <CIcon name="chevron-right" :margin-right="false" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    endCursor: {
      type: String,
      default: ''
    },
    hasNextPage: {
      type: Boolean,
      default: false
    },
    hasPreviousPage: {
      type: Boolean,
      default: false
    },
    startCUrsor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.p-pagination__link {
  transition: 0.2s ease;
}

.p-pagination__link[disabled] {
  @apply cursor-not-allowed;
  @apply opacity-50;
  @apply bg-grey-light;
  @apply text-blue-darker;
}
</style>
