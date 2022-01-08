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
    v-else-if="!isBrowser() && imageDataExists()"
    :src="createBlank()"
    :data-async-img="insertImageSettings()"
    loading="lazy"
  >
  <img
    v-else
    :src="src"
    loading="lazy"
  >
</template>

<script>
import { escapeHtml } from '~/libs/escape-html'
import imagesData from "../images-data.json";
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
        imageData: imagesData['static' + this.$props.src] ?? {},
        imageSettingsDefault: {
          src: this.$props.src,
          scroll: true,
          isBackground: false,
          manual: false,
          isHigh: false,
        },
        imageSettings: {}
      }
    },
    methods: {
      isBrowser() {
        return process.browser
      },
      imageDataExists() {
        return Object.keys(this.imageData).length > 0
      },
      createBlank() {
        return 'data:image/svg+xml,' + encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${this.imageData.dimensions.width}" height="${this.imageData.dimensions.height}"></svg>`
        )
      },
      isBackground() {
        return this.imageSettings.isBackground
      },
      getImageSettings() {
        if (Object.keys(this.imageSettings).length > 0) return this.imageSettings
        this.imageSettings = {
          // Default
          ...this.imageSettingsDefault,
          // From Data
          ...{
            isHigh: this.imageData.size >= process.env.MAX_SIZE_TO_HIGH_LOAD,
          },
          // Props
          ...(this.$props.data ?? {
            isBackground: this.$props.background !== undefined
          })
        }
        return this.imageSettings
      },
      insertImageSettings() {
        return escapeHtml(JSON.stringify(this.getImageSettings()))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>