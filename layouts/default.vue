<template>
  <div>
    <header class="l-header flex h-16">
      <div class="container flex items-center mx-auto">
        <div class="p-title">
          <h1>
            GitHub
            <span class="p-title__label font-normal ml-2 px-2 py-1 rounded-sm">good first issue</span>
          </h1>
        </div>
        <button
          v-if="loggedIn"
          class="p-logout flex hover:bg-grey-darkest ml-auto items-center px-2 self-stretch text-white"
          @click="logout"
        >
          <CIcon name="sign-out" />Sign out
        </button>
      </div>
    </header>
    <nuxt />
    <footer class="bg-grey-lighter">
      <div class="container flex mx-auto py-6">
        <div>&copy; 2019 uu1t</div>
        <div class="ml-auto">
          <a href="https://github.com/uu1t/good-first-issue" target="_blank" class="inline-flex items-center">
            <CIcon name="mark-github" />Source code
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.l-header {
  background: #24292e;
}

.p-title > * {
  font-size: 1.25rem;
  color: #ffffff;
}

.p-title__label {
  background: #7057ff;
}

.p-logout {
  transition: background 0.2s ease;
}
</style>
