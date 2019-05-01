<template>
  <div class="border-b flex items-center p-2">
    <CIcon name="repo" class="text-grey-dark" />
    <a :href="ownerUrl" target="_blank">{{ owner }}</a>
    <span class="mx-1">/</span>
    <a :href="url" target="_blank" class="mr-auto">{{ name }}</a>
    <!-- <CTag v-if="primaryLanguage" :color="primaryLanguage.color" class="mr-2">{{ primaryLanguage.name }}</CTag>
    <CTag>
      <CIcon name="star" />
      {{ stargazers.totalCount }}
    </CTag>-->
  </div>
</template>

<script>
const ORIGIN = 'https://github.com'

export default {
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    fragments() {
      return this.apiUrl.split('/')
    },
    name() {
      return this.fragments[this.fragments.length - 1]
    },
    owner() {
      return this.fragments[this.fragments.length - 2]
    },
    ownerUrl() {
      return `${ORIGIN}/${this.owner}`
    },
    url() {
      return `${ORIGIN}/${this.owner}/${this.name}`
    }
  }
}
</script>
