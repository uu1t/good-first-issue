<template>
  <div class="p-issue-result border my-4 rounded">
    <RepositoryDetail
      :name="issue.repository.name"
      :owner="issue.repository.owner"
      :primary-language="issue.repository.primaryLanguage"
      :stargazers="issue.repository.stargazers"
      :url="issue.repository.url"
      class="p-repository"
    />
    <UserDetail
      :avatar-url="issue.author.avatarUrl"
      :login="issue.author.login"
      :url="issue.author.url"
      class="p-user"
    />
    <IssueDetail
      :body-text="issue.bodyText"
      :comments="issue.comments"
      :labels="issue.labels"
      :title="issue.title"
      :url="issue.url"
      class="p-issue"
    />
  </div>
</template>

<script>
import IssueDetail from './IssueDetail.vue'
import RepositoryDetail from './RepositoryDetail.vue'
import UserDetail from './UserDetail.vue'

export default {
  components: {
    IssueDetail,
    RepositoryDetail,
    UserDetail
  },
  props: {
    issue: {
      type: Object,
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
