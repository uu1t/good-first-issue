<template>
  <div class="container flex flex-col mx-auto">
    <CButton class="p-login" @click.native="login">Sign in with GitHub</CButton>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // eslint-disable-next-line
      console.log('clicked')
    }
  }
}
</script>

<style scoped>
.container {
  align-items: center;
}

.p-login {
  @apply mt-12;
}
</style>
