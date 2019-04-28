<template>
  <div class="px-2 py-4">
    <a :href="url" target="_blank" class="flex flex-col items-center">
      <img :src="avatarUrl" class="mb-1 rounded w-16 md:w-24" />
      <div class="text-sm">@{{ login }}</div>
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
