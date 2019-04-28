<template>
  <div class="p-issue-result border my-4 rounded">
    <RepositoryDetail
      :name="repository.name"
      :owner="repository.owner"
      :primary-language="repository.primaryLanguage"
      :stargazers="repository.stargazers"
      :url="repository.url"
      class="p-repository"
    />
    <UserDetail :avatar-url="author.avatarUrl" :login="author.login" :url="author.url" class="p-user" />
    <div class="p-issue">{{ title }}</div>
  </div>
</template>

<script>
import RepositoryDetail from './RepositoryDetail.vue'
import UserDetail from './UserDetail.vue'

export default {
  components: {
    RepositoryDetail,
    UserDetail
  },
  props: {
    author: {
      type: Object,
      required: true
    },
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

<style scoped>
.p-issue-result {
  display: grid;
  grid-template-areas:
    'repository repository'
    'user issue';
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto auto;
}

@media (min-width: 768px) {
  .p-issue-result {
    grid-template-columns: minmax(min-content, 150px) 3fr;
  }
}

.p-repository {
  grid-area: repository;
}

.p-user {
  grid-area: user;
}

.p-issue {
  grid-area: issue;
}
</style>
