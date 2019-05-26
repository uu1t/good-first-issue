<template>
  <div class="flex flex-wrap mt-2 mb-10">
    <div class="mt-4 w-full md:pr-2 md:w-1/2">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="label">Label</label>
      <div class="relative">
        <select
          id="label"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          :value="label"
          @change="$emit('update:label', $event.target.value)"
        >
          <option></option>
          <option>good first issue</option>
          <option>help wanted</option>
          <option>up for grabs</option>
        </select>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <CIcon name="chevron-down" :margin-right="false" />
        </div>
      </div>
    </div>
    <div class="mt-4 w-full md:pl-2 md:w-1/2">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="language">Language</label>
      <div class="relative">
        <select
          id="language"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          :value="language"
          @change="$emit('update:language', $event.target.value)"
        >
          <option></option>
          <option v-for="l in languages" :key="l">{{ l }}</option>
        </select>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <CIcon name="chevron-down" :margin-right="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LANGUAGES } from '~/utils/constants'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: ''
    }
  },
  computed: {
    languages() {
      return Object.keys(LANGUAGES)
    }
  }
}
</script>
