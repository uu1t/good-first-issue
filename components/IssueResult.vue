<template>
  <div class="border my-4 rounded">
    <RepositoryDetail
      :name="repository.name"
      :owner="repository.owner"
      :primary-language="repository.primaryLanguage"
      :stargazers="repository.stargazers"
      :url="repository.url"
    />
    {{ title }}
  </div>
</template>

<script>
import RepositoryDetail from './RepositoryDetail.vue'

export default {
  components: {
    RepositoryDetail
  },
  props: {
    repository: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
a {
  @apply no-underline;
  @apply text-blue-dark;
}

a:hover {
  @apply text-blue-darker;
}
</style>
