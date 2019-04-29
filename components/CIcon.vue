<template>
  <Octicon :name="name" :spin="spin" class="w-4 h-4 mr-2" />
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/comment-discussion'
import 'vue-octicon/icons/mark-github'
import 'vue-octicon/icons/repo'
import 'vue-octicon/icons/sign-out'
import 'vue-octicon/icons/star'
import 'vue-octicon/icons/sync'

export default {
  components: {
    Octicon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
