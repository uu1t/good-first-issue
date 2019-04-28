<template>
  <div class="border-b flex items-center p-2">
    <CIcon name="repo" class="text-grey-dark" />
    <a :href="owner.url" target="_blank">{{ owner.login }}</a>
    <span class="mx-1">/</span>
    <a :href="url" target="_blank" class="mr-auto">{{ name }}</a>
    <CTag v-if="primaryLanguage" :color="primaryLanguage.color" class="mr-2">{{ primaryLanguage.name }}</CTag>
    <CTag>
      <CIcon name="star" />
      {{ stargazers.totalCount }}
    </CTag>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Object,
      required: true
    },
    primaryLanguage: {
      type: Object,
      default: () => ({})
    },
    stargazers: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>
