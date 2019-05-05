<template>
  <div class="border-b flex items-center p-2">
    <CIcon name="repo" class="text-grey-dark" />
    <a :href="owner.url" target="_blank">{{ owner.login }}</a>
    <span class="mx-1">/</span>
    <a :href="url" target="_blank" class="mr-auto">{{ name }}</a>
    <CTag v-if="language" :color="language.color" class="mr-2">{{ language.name }}</CTag>
    <CTag>
      <CIcon name="star" />
      {{ stargazersCount }}
    </CTag>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Object,
      required: true
    },
    stargazersCount: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>
