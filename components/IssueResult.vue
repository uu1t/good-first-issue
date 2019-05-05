<template>
  <div class="p-issue-result border my-4 rounded">
    <RepositoryDetail
      :language="issue.repository.primaryLanguage"
      :name="issue.repository.name"
      :owner="issue.repository.owner"
      :stargazers-count="issue.repository.stargazers.totalCount"
      :url="issue.repository.url"
    />
    <div class="flex">
      <UserDetail
        :avatar-url="issue.author.avatarUrl"
        :login="issue.author.login"
        :url="issue.author.url"
        class="p-user flex-no-shrink overflow-hidden"
      />
      <IssueDetail
        :body-text="issue.bodyText"
        :comments-count="issue.comments.totalCount"
        :labels="issue.labels.nodes"
        :title="issue.title"
        :url="issue.url"
        class="overflow-hidden"
      />
    </div>
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
.p-user {
  flex-basis: 6rem;
}

@media (min-width: 768px) {
  .p-user {
    flex-basis: 8rem;
  }
}
</style>
