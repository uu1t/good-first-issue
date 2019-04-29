<template>
  <div class="px-2 py-4">
    <div class="p-title text-lg mb-2">
      <a :href="url" target="_blank">{{ title }}</a>
    </div>
    <div class="p-body mb-2">{{ bodyText }}</div>
    <div class="flex items-center">
      <CTag v-if="comments.totalCount > 0" class="mr-1">
        <CIcon name="comment-discussion" />
        {{ comments.totalCount }}
      </CTag>
      <CTag v-for="label of labels.nodes" :key="label.id" :color="`#${label.color}`" class="mr-1">
        {{ label.name }}
      </CTag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bodyText: {
      type: String,
      required: true
    },
    comments: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.p-body {
  height: 2.25rem;
  overflow: hidden;
}
</style>
