<template>
  <div class="px-2 py-4">
    <a :href="url" target="_blank" :title="`@${login}`" class="flex flex-col items-center">
      <img :src="avatarUrl" :alt="`@${login}`" class="mb-1 rounded w-16 md:w-24" />
      <div class="p-login text-sm">@{{ login }}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.p-login {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
