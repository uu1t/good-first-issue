<template>
  <main class="container flex flex-col items-center mx-auto my-16">
    <CButton @click.native="login"><CIcon name="mark-github" />Sign in with GitHub</CButton>
  </main>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWith('github')
    }
  }
}
</script>
