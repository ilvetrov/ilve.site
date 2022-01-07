<template>
  <div
    v-if="isBrowser() && isBackground()"
    :style="`background-image: url(${src})`"
  >
    <slot></slot>
  </div>
  <div
    v-else-if="isBackground()"
    :data-async-img="insertImageSettings()"
  >
    <slot></slot>
  </div>
  <img
    v-else
    :src="src"
    loading="lazy"
  >
</template>

<script>
import { escapeHtml } from '~/libs/escape-html'
  export default {
    props: {
      src: {
        type: String,
        required: true
      },
      data: {
        type: Object
      },
      background: {
        type: String
      }
    },
    data() {
      return {
        imageSettings: {
          // Default
          ...{
            src: this.$props.src,
            scroll: true,
            isBackground: false,
            manual: false,
            isHigh: false,
          },
          // Custom
          ...(this.$props.data ?? {
            isBackground: this.$props.background !== undefined
          })
        }
      }
    },
    methods: {
      isBrowser() {
        return process.browser
      },
      isBackground() {
        return this.imageSettings.isBackground
      },
      insertImageSettings() {
        return escapeHtml(JSON.stringify(this.imageSettings))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>