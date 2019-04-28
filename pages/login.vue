<template>
  <div class="container flex flex-col items-center mx-auto">
    <CButton class="mt-12" @click.native="login"><CIcon name="mark-github" />Sign in with GitHub</CButton>
  </div>
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
