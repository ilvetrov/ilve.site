<template>
  <div
    v-if="isBrowser() && !fromServer() && isBackground()"
    :style="`background-image: url(${src})`"
  >
    <slot></slot>
  </div>
  <div
    v-else-if="isBackground()"
    :data-async-img="insertImageSettings()"
    :style="`background-color: ${loadingColor}`"
  >
    <slot></slot>
  </div>
  <img
    v-else-if="!isBrowser() && imageDataExists() && checkTheNeedForLazy()"
    :src="createBlank()"
    :data-async-img="insertImageSettings()"
    :width="imageData.dimensions.width"
    :height="imageData.dimensions.height"
    loading="lazy"
  >
  <img
    v-else
    :src="src"
    :width="getSize('width')"
    :height="getSize('height')"
    loading="lazy"
    :style="!isSvg() ? `background-color: ${loadingColor}` : null"
    @load="!isSvg() ? removeLoadingColor : null"
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
        loadingColor: '#192024',
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
      fromServer() {
        return this?.$el?.hasAttribute('data-async-img')
      },
      imageDataExists() {
        return Object.keys(this.imageData).length > 0
      },
      isSvg() {
        const parts = this.src.split('.')
        return parts[parts.length - 1] === 'svg'
      },
      getSize(prop) {
        return this.imageDataExists() ? this.imageData.dimensions[prop] : null
      },
      checkTheNeedForLazy() {
        return !this.isSvg() && this.imageData.size > process.env.MIN_SIZE_TO_LAZY_LOAD
      },
      createBlank() {
        return 'data:image/svg+xml,' + encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${this.imageData.dimensions.width}" height="${this.imageData.dimensions.height}"><rect width="${this.imageData.dimensions.width}" height="${this.imageData.dimensions.height}" fill="${this.loadingColor}"/></svg>`
        )
      },
      isBackground() {
        return this.getImageSettings().isBackground
      },
      getImageSettings() {
        if (Object.keys(this.imageSettings).length > 0) return this.imageSettings
        this.imageSettings = {
          // Default
          ...this.imageSettingsDefault,
          // From Data
          ...{
            isHigh: this.imageData?.size >= process.env.MAX_SIZE_TO_HIGH_LOAD,
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
      },
      removeLoadingColor() {
        this.$el.style.backgroundColor = ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>