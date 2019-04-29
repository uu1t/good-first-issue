<template>
  <div class="px-2 py-4">
    <div class="p-title text-lg mb-3">
      <a :href="url" target="_blank">{{ title }}</a>
    </div>
    <div v-if="bodyText" class="p-body text-grey-darker">{{ bodyText }}</div>
    <div class="flex items-center mt-4">
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
/* See http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/ */
.p-body {
  line-height: 1.2;
  max-height: 2.4rem;
  overflow: hidden;
  padding-right: 1rem;
  position: relative;
  text-align: justify;
}

.p-body:before {
  bottom: 0;
  content: '...';
  position: absolute;
  right: 0;
}

.p-body:after {
  background: white;
  content: '';
  height: 1rem;
  margin-top: 0.2em;
  position: absolute;
  right: 0;
  width: 1rem;
}
</style>
