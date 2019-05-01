<template>
  <main class="container mx-auto">
    <div v-if="isLoading" class="p-loading flex flex-col items-center my-16">
      <CIcon name="sync" spin />
    </div>
    <transition-group>
      <IssueResult v-for="issue in issueResults" :key="issue.id" :issue="issue" />
      <!-- <div key="p-pagination" class="flex justify-center mb-4">
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
      </div>-->
    </transition-group>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import IssueResult from '~/components/IssueResult.vue'

export default {
  components: {
    IssueResult
  },
  data: () => ({
    isLoading: true
  }),
  computed: {
    ...mapState(['issueResults'])
  },
  async created() {
    try {
      await this.searchIssues()
      this.isLoading = false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },
  methods: {
    ...mapActions(['searchIssues'])
  }
}
</script>

<style scoped>
.p-pagination__link {
  transition: 0.2s ease;
}
</style>
