<template>
  <div class="border-b flex items-center p-2">
    <CIcon name="repo" class="text-grey-dark" />
    <a :href="ownerUrl" target="_blank">{{ owner }}</a>
    <span class="mx-1">/</span>
    <a :href="url" target="_blank" class="mr-auto">{{ name }}</a>
    <CIcon v-if="!repository || repository.isLoading" name="sync" :margin-right="false" spin />
    <template v-else>
      <CTag v-if="repository.language" class="mr-2">{{ repository.language }}</CTag>
      <CTag>
        <CIcon name="star" />
        {{ repository.stargazers_count }}
      </CTag>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const ORIGIN = 'https://github.com'

export default {
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data: () => ({
    observer: null
  }),
  computed: {
    ...mapGetters(['getRepository']),
    repository() {
      return this.getRepository(this.apiUrl)
    },
    urlFragments() {
      return this.apiUrl.split('/')
    },
    name() {
      return this.urlFragments[this.urlFragments.length - 1]
    },
    owner() {
      return this.urlFragments[this.urlFragments.length - 2]
    },
    ownerUrl() {
      return `${ORIGIN}/${this.owner}`
    },
    url() {
      return `${ORIGIN}/${this.owner}/${this.name}`
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        this.observer.disconnect()
        this.doFetchRepository()
      }
    })
    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer.disconnect()
  },
  methods: {
    ...mapActions(['fetchRepository']),
    async doFetchRepository() {
      try {
        await this.fetchRepository(this.apiUrl)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>
