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
      <Pagination
        :end-cursor="search.pageInfo.endCursor"
        :has-next-page="search.pageInfo.hasNextPage"
        :has-previous-page="search.pageInfo.hasPreviousPage"
        :start-cursor="search.pageInfo.startCursor"
        @click:navigate-first="onClickNavigateFirst"
        @click:navigate-next="onClickNavigateNext"
        @click:navigate-previous="onClickNavigatePrevious"
      />
    </template>
  </main>
</template>

<script>
import { mapMutations } from 'vuex'
import gql from 'graphql-tag'

import firebase from '~/plugins/firebase'
import { DEFAULT_LABEL, PER_PAGE } from '~/utils/constants'
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
    search: {
      pageInfo: {}
    }
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
    query() {
      let query = `is:issue is:open label:"${this.label}"`
      if (this.language) {
        query += ` language:"${this.language}"`
      }
      return query
    },
    searchParams() {
      return {
        label: this.label,
        language: this.language
      }
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
  },
  methods: {
    ...mapMutations(['setToken']),
    onClickNavigateFirst() {
      this.$router.push({
        query: this.queryParams({})
      })
    },
    onClickNavigateNext() {
      this.$router.push({
        query: this.queryParams({
          after: this.search.pageInfo.endCursor
        })
      })
    },
    onClickNavigatePrevious() {
      this.$router.push({
        query: this.queryParams({
          before: this.search.pageInfo.startCursor
        })
      })
    },
    onUpdateLabel(label) {
      this.$router.push({
        query: this.queryParams({ label })
      })
    },
    onUpdateLanguage(language) {
      this.$router.push({
        query: this.queryParams({ language })
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
          vars.last = PER_PAGE
        } else {
          vars.first = PER_PAGE
        }
        return vars
      }
    }
  }
}
</script>
