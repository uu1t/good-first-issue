<template>
  <div class="flex justify-center mb-4">
    <nuxt-link
      :disabled="page == 1"
      :event="page == 1 ? '' : 'click'"
      :to="{ query: { page: undefined } }"
      class="p-pagination__link border hover:bg-grey-light inline-flex items-center p-2 rounded-l"
    >
      <CIcon name="chevron-doulbe-left" :margin-right="false" />
    </nuxt-link>
    <nuxt-link
      :disabled="page == 1"
      :event="page == 1 ? '' : 'click'"
      :to="{ query: { page: page > 2 ? page - 1 : undefined } }"
      class="p-pagination__link border-t border-r border-b hover:bg-grey-light inline-flex items-center p-2 rounded-r"
    >
      <CIcon name="chevron-left" :margin-right="false" />
    </nuxt-link>
    <span class="mx-2 p-2">{{ page }}</span>
    <nuxt-link
      :disabled="page >= totalPage"
      :event="page >= totalPage ? '' : 'click'"
      :to="{ query: { page: page + 1 } }"
      class="p-pagination__link border hover:bg-grey-light inline-flex items-center p-2 rounded"
    >
      <CIcon name="chevron-right" :margin-right="false" />
    </nuxt-link>
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
