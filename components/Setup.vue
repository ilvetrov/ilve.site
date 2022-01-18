<template>
  <div>
    <style class="js-async-background"></style>

    <script>
      (function() {
        function setTrueVh() {
          document.documentElement.style.setProperty('--true-vh', (window.innerHeight * 0.01) + 'px');
        }
        setTrueVh();
        document.documentElement.setTrueVh = setTrueVh;
      }());
    </script>
  </div>
</template>

<script>
import resizeWidthEventName from '~/plugins/partials/width-resize-event'
import PureHandlers from '~/plugins/pure-handlers'
export default {
  data() {
    return {
      pureHandlers: new PureHandlers()
    }
  },
  mounted() {
    this.pureHandlers.addEventListener(window, resizeWidthEventName, document.documentElement.setTrueVh)
  },
  beforeDestroy() {
    this.pureHandlers.destroy()
  }
}
</script>