<template>
  <div class="p-issue-result border my-4 rounded">
    <RepositoryDetail :api-url="issue.repository_url" />
    <div class="flex">
      <UserDetail
        :avatar-url="issue.user.avatar_url"
        :login="issue.user.login"
        :url="issue.user.html_url"
        class="p-user flex-no-shrink"
      />
      <IssueDetail
        :body="issue.body"
        :comments="issue.comments"
        :labels="issue.labels"
        :title="issue.title"
        :url="issue.html_url"
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
