<template>
  <main class="container mx-auto">
    <QueryFilter
      :label="label"
      :language="language"
      @update:label="onUpdateLabel"
      @update:language="onUpdateLanguage"
    />
    <div v-if="$apollo.loading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <template v-else>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
      <!-- <Pagination :page="page" :total-count="totalCount" @click:navigate="onClickNavigate" /> -->
    </template>
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import gql from 'graphql-tag'

import firebase from '~/plugins/firebase'
import { DEFAULT_LABEL, DEFAULT_PAGE } from '~/utils/constants'
import IssueResult from '~/components/IssueResult.vue'
// import Pagination from '~/components/Pagination.vue'
import QueryFilter from '~/components/QueryFilter.vue'

export default {
  components: {
    IssueResult,
    // Pagination,
    QueryFilter
  },
  data: () => ({
    isLoading: true,
    search: {
      pageInfo: {}
    },
    query: 'is:issue label:"good first issue"'
  }),
  computed: {
    issueResults() {
      const { nodes = [] } = this.search
      return nodes
    },
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
  async created() {
    const result = await new Promise(resolve => {
      firebase
        .auth()
        .getRedirectResult()
        .then(resolve)
    })
    if (result.credential) {
      this.setToken(result.credential.accessToken)
    }
    // this.doSearchIssues()
  },
  methods: {
    ...mapActions(['searchIssues']),
    ...mapMutations(['setToken']),
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
      if (params.label === DEFAULT_LABEL) {
        delete params.label
      }
      if (!params.language) {
        delete params.language
      }
      if (params.page === 1) {
        delete params.page
      }
      return params
    }
  },
  apollo: {
    search: {
      query: gql`
        query SearchIssues($query: String!, $after: String, $before: String, $first: Int, $last: Int) {
          search(type: ISSUE, query: $query, after: $after, before: $before, first: $first, last: $last) {
            issueCount
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            nodes {
              ... on Issue {
                bodyText
                id
                title
                url
                author {
                  avatarUrl
                  login
                  url
                }
                comments {
                  totalCount
                }
                labels(first: 10) {
                  nodes {
                    ... on Label {
                      color
                      id
                      name
                    }
                  }
                }
                repository {
                  name
                  url
                  owner {
                    login
                    url
                  }
                  primaryLanguage {
                    color
                    name
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        const { after, before } = this.$route.query
        const vars = {
          after,
          before,
          query: this.query
        }
        if (before) {
          vars.last = 20
        } else {
          vars.first = 20
        }
        return vars
      }
    }
  }
}
</script>
