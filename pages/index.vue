<template>
  <main class="container mx-auto">
    <div v-if="$apollo.loading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <transition-group>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
      <div key="p-pagination" class="flex justify-center mb-4">
        <nuxt-link
          v-if="hasPreviousPage"
          to="/"
          class="p-pagination__link border hover:bg-grey-light inline-flex items-center p-2 rounded-l"
        >
          <CIcon name="chevron-doulbe-left" :margin-right="false" />
        </nuxt-link>
        <nuxt-link
          v-if="hasPreviousPage"
          :to="{ query: previousPageQuery }"
          class="p-pagination__link border-t border-r border-b mr-4 hover:bg-grey-light inline-flex items-center p-2 rounded-r"
        >
          <CIcon name="chevron-left" :margin-right="false" />
        </nuxt-link>
        <nuxt-link
          v-if="hasNextPage"
          :to="{ query: nextPageQuery }"
          class="p-pagination__link border hover:bg-grey-light inline-flex items-center p-2 rounded"
        >
          <CIcon name="chevron-right" :margin-right="false" />
        </nuxt-link>
      </div>
    </transition-group>
  </main>
</template>

<script>
import gql from 'graphql-tag'

import IssueResult from '~/components/IssueResult.vue'

export default {
  components: {
    IssueResult
  },
  data: () => ({
    search: {
      pageInfo: {}
    },
    query: 'is:issue label:"good first issue"'
  }),
  computed: {
    hasNextPage() {
      const { hasNextPage } = this.search.pageInfo
      return hasNextPage
    },
    hasPreviousPage() {
      const { hasPreviousPage } = this.search.pageInfo
      return hasPreviousPage || false
    },
    issueResults() {
      const { nodes = [] } = this.search
      return nodes
    },
    nextPageQuery() {
      const { endCursor: after } = this.search.pageInfo
      return { after }
    },
    previousPageQuery() {
      const { startCursor: before } = this.search.pageInfo
      return { before }
    }
  },
  apollo: {
    search: {
      // See https://stackoverflow.com/a/49082397
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
                labels(first: 5) {
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

<style scoped>
.p-pagination__link {
  transition: 0.2s ease;
}
</style>
