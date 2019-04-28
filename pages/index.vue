<template>
  <main class="container mx-auto">
    <IssueResult
      v-for="issue in issueResults"
      :key="issue.key"
      :repository="issue.repository"
      :title="issue.title"
      :url="issue.url"
    ></IssueResult>
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
    query: 'is:issue label:"good first issue"'
  }),
  computed: {
    issueResults() {
      return this.search && this.search.edges ? this.search.edges.map(edge => edge.node) : []
    }
  },
  apollo: {
    search: {
      // See: https://stackoverflow.com/a/49082397
      query: gql`
        query SearchIssues($query: String!) {
          search(first: 20, type: ISSUE, query: $query) {
            issueCount
            edges {
              node {
                ... on Issue {
                  id
                  title
                  url
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
        }
      `,
      variables() {
        return {
          query: this.query
        }
      }
    }
  }
}
</script>
