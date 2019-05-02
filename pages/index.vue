<template>
  <main class="container mx-auto">
    <div v-if="isLoading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <transition-group>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
      <Pagination key="p-pagination" :page="page" :total-count="totalCount" />
    </transition-group>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { DEFAULT_PAGE } from '~/utils/constants'
import IssueResult from '~/components/IssueResult.vue'
import Pagination from '~/components/Pagination.vue'

export default {
  components: {
    IssueResult,
    Pagination
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    ...mapState(['issueResults', 'totalCount']),
    page() {
      return Number.parseInt(this.$route.query.page) || DEFAULT_PAGE
    },
    searchParams() {
      return this.page
    }
  },
  watch: {
    searchParams() {
      this.doSearchIssues()
    }
  },
  created() {
    this.doSearchIssues()
  },
  methods: {
    ...mapActions(['searchIssues']),
    async doSearchIssues() {
      try {
        await this.searchIssues({ page: this.page })
        this.isLoading = false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>
