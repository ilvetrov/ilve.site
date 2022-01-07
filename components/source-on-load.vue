<template>
  <source v-if="isBrowser()" :src="src">
  <source v-else data-on-load-attr="src" :data-on-load-src="src">
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        required: true
      }
    },
    methods: {
      isBrowser() {
        return process.browser
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>