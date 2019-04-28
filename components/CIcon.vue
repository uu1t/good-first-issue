<template>
  <Octicon :name="name" class="w-4 h-4 mr-2" />
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/mark-github'
import 'vue-octicon/icons/repo'
import 'vue-octicon/icons/sign-out'
import 'vue-octicon/icons/star'

export default {
  components: {
    Octicon
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
