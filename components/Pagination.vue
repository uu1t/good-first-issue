<template>
  <div class="flex justify-center mb-4">
    <button
      :disabled="page == 1"
      class="p-pagination__link border hover:bg-grey-light hover:text-blue-darker inline-flex items-center p-2 rounded-l text-blue-dark"
      @click="$emit('click:navigate', 1)"
    >
      <CIcon name="chevron-doulbe-left" :margin-right="false" />
    </button>
    <button
      :disabled="page == 1"
      class="p-pagination__link border-t border-r border-b hover:bg-grey-light hover:text-blue-darker inline-flex items-center p-2 rounded-r text-blue-dark"
      @click="$emit('click:navigate', page - 1)"
    >
      <CIcon name="chevron-left" :margin-right="false" />
    </button>
    <span class="mx-2 p-2">{{ page }}</span>
    <button
      :disabled="page >= totalPage"
      class="p-pagination__link border hover:bg-grey-light hover:text-blue-darker inline-flex items-center p-2 rounded text-blue-dark"
      @click="$emit('click:navigate', page + 1)"
    >
      <CIcon name="chevron-right" :margin-right="false" />
    </button>
  </div>
</template>

<script>
import { PER_PAGE } from '~/utils/constants'

export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / PER_PAGE)
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
