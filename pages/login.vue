<template>
  <main class="container flex flex-col items-center mx-auto my-16">
    <CButton @click.native="login"> <CIcon name="mark-github" />Sign in with GitHub </CButton>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['login'])
  }
}
</script>
