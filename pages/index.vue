<template>
  <main class="container mx-auto">
    <QueryFilter
      :label="label"
      :language="language"
      @update:label="onUpdateLabel"
      @update:language="onUpdateLanguage"
    />
    <div v-if="isLoading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <transition-group>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
      <Pagination key="p-pagination" :page="page" :total-count="totalCount" @click:navigate="onClickNavigate" />
    </transition-group>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import { DEFAULT_LABEL, DEFAULT_PAGE } from '~/utils/constants'
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
    label() {
      return this.$route.query.label || DEFAULT_LABEL
    },
    language() {
      return this.$route.query.language
    },
    page() {
      return Number.parseInt(this.$route.query.page) || DEFAULT_PAGE
    },
    searchParams() {
      return {
        label: this.label,
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
    onClickNavigate(page) {
      this.$router.push({
        query: this.queryParams({ page })
      })
    },
    onUpdateLabel(label) {
      this.$router.push({
        query: this.queryParams({ label, page: 1 })
      })
    },
    onUpdateLanguage(language) {
      this.$router.push({
        query: this.queryParams({ language, page: 1 })
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
