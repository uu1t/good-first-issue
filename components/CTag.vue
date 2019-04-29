<template>
  <span class="bg-grey-light border inline-flex items-center px-2 py-1 rounded-sm" :style="colorStyles">
    <slot />
  </span>
</template>

<script>
const invertColor = color => {
  const rgb = Number.parseInt(color.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luminescence = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (luminescence < 140) {
    return '#ffffff'
  } else {
    return '#22292f'
  }
}

export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    colorStyles() {
      return this.color
        ? {
            backgroundColor: this.color,
            borderColor: this.color,
            color: invertColor(this.color)
          }
        : {}
    }
  }
}
</script>
