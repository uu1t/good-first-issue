<template>
  <main class="container mx-auto">
    <QueryFilter :language="language" @update:language="onUpdateLanguage" />
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
import QueryFilter from '~/components/QueryFilter.vue'

export default {
  components: {
    IssueResult,
    Pagination,
    QueryFilter
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    ...mapState(['issueResults', 'totalCount']),
    language() {
      return this.$route.query.language
    },
    page() {
      return Number.parseInt(this.$route.query.page) || DEFAULT_PAGE
    },
    searchParams() {
      return {
        language: this.language,
        page: this.page
      }
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
      this.isLoading = true
      try {
        await this.searchIssues(this.searchParams)
        this.isLoading = false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    onUpdateLanguage(language) {
      this.$router.push({
        query: this.queryParams({ language })
      })
    },
    queryParams(nextParams) {
      const params = { ...this.searchParams, ...nextParams }
      if (params.page === 1) {
        delete params.page
      }
      if (!params.language) {
        delete params.language
      }
      return params
    }
  }
}
</script>
