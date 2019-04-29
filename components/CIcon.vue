<template>
  <Octicon :name="name" :spin="spin" class="w-4 h-4" :class="{ 'mr-2': marginRight }" />
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/chevron-left'
import 'vue-octicon/icons/chevron-right'
import 'vue-octicon/icons/comment-discussion'
import 'vue-octicon/icons/mark-github'
import 'vue-octicon/icons/repo'
import 'vue-octicon/icons/sign-out'
import 'vue-octicon/icons/star'
import 'vue-octicon/icons/sync'

Octicon.register({
  'chevron-doulbe-left': {
    width: 12,
    height: 16,
    d: 'M5 3l1.5 1.5L2.75 8l3.75 3.5L5 13 0 8l5-5zm5.5 0L12 4.5 8.25 8 12 11.5 10.5 13l-5-5 5-5z'
  }
})

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
    },
    marginRight: {
      type: Boolean,
      default: true
    }
  }
}
</script>
