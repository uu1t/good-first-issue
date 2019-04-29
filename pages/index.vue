<template>
  <main class="container mx-auto">
    <div v-if="$apollo.loading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <transition-group>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
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
    query: 'is:issue label:"good first issue"'
  }),
  computed: {
    issueResults() {
      return this.search && this.search.nodes ? this.search.nodes : []
    }
  },
  apollo: {
    search: {
      // See https://stackoverflow.com/a/49082397
      query: gql`
        query SearchIssues($query: String!) {
          search(first: 20, type: ISSUE, query: $query) {
            issueCount
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
        return {
          query: this.query
        }
      }
    }
  }
}
</script>
