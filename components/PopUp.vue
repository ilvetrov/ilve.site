<template>
  <div
    class="pop-up"
    :data-pop-up="name ? name : 'as-page'"
    @click="closeAnywhere && closePopUp()"
  >
    <div class="pop-up__overlay" @click="closePopUp()"></div>
    <div :class="'pop-up__wrap js-for-replace-scrollbar ' + wrapClass">
      <slot v-if="plain"></slot>
      <div v-else class="pop-up__content">
        <div :class="'pop-up-content custom-scrollbar-second ' + contentClass" data-pop-up-content>
          <script>
            (function() {
              var content = document.currentScript.parentElement;
              function calcMaxHeight() {
                var remMod = getRem() / 16;
                var bottomOffset = 64 * remMod;
                var headerOffset = 117 * remMod;
                var maxUXHeight = Math.max(window.innerHeight * 0.6, 457);
                var maxHeight = Math.min(Math.max(100, window.innerHeight - headerOffset - bottomOffset), maxUXHeight);
                content.style.maxHeight = maxHeight + 'px';
              }
              function getRem() {
                try {
                  return Number(getComputedStyle(document.documentElement).fontSize.match(/(.+?)px/)[1])
                } catch (error) {
                  console.error(error)
                  return 16
                }
              }
              calcMaxHeight();
              content.calcMaxHeight = calcMaxHeight;
            }());
          </script>
          <slot></slot>
        </div>
        <!-- /.pop-up-content -->
      </div>
      <!-- /.pop-up__content -->
      <div class="pop-up__close-block">
        <img class="pop-up__close click-extender" src="/img/close.svg" :alt="$t('close')" @click="closePopUp()">
      </div>
      <!-- /.pop-up__close-block -->
    </div>
    <!-- /.pop-up__wrap -->
  </div>
  <!-- /.pop-up -->
</template>

<script>
import { unblockScroll } from '~/plugins/block-scroll'
import PureHandlers from '~/plugins/pure-handlers'
  export default {
    props: {
      isPage: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      closeAnywhere: {
        type: Boolean,
        default: false
      },
      wrapClass: {
        type: String,
        default: ''
      },
      contentClass: {
        type: String,
        default: ''
      },
      name: {
        type: String
      }
    },
    data() {
      return {
        pureHandlers: new PureHandlers()
      }
    },
    mounted() {
      if (this.isBrowser()) {
        const content = this.$el.querySelector('[data-pop-up-content]')
        if (content && content.calcMaxHeight) {
          this.pureHandlers.addEventListener(window, 'resize', content.calcMaxHeight)
        }
      }
    },
    beforeDestroy() {
      this.pureHandlers.destroy()
    },
    methods: {
      closePopUp() {
        if (this.$props.isPage) {
          this.goParent()
        } else {
          if (this.$el.classList.contains('process')) return
          this.$el.classList.add('process')
          this.$el.classList.add('hidden')
          unblockScroll(this.$el.getAttribute('data-pop-up'))

          setTimeout(() => {
            if (!this.$el.classList.contains('process')) return
            this.$el.classList.remove('process')
            this.$el.classList.add('disabled')
          }, 210);
        }
      },
      isBrowser() {
        return process.browser
      },
      goBack() {
        window.history.length > 2 ? this.$router.go(-1) : this.$router.push(this.getParent())
      },
      getParent() {
        let rawRoutes = this.$router.currentRoute.path.split('/')
        rawRoutes.pop()
        const parentRouteRaw = rawRoutes.join('/')
        return !!parentRouteRaw.match(/^\//) ? parentRouteRaw : `/${parentRouteRaw}`
      },
      goParent() {
        this.$router.push(this.getParent())
      }
    }
  }
</script>

<style lang="scss">
  .pop-up {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 10;
    @extend .pop-up-enter-active;

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(26, 28, 33, 0.9);
    }
    &__wrap {
      position: absolute;
      width: 100%;
      bottom: 0;
      transform-origin: bottom;
      transition: transform .2s ease-in-out;
    }
    &__content {
      display: block;
      width: auto;
      margin-left: .875rem;
      margin-right: .875rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    &__close-block {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    &__close {
      opacity: .3;
      transition: opacity .2s;
      height: 1rem;
      width: auto;

      &:hover, &:focus {
        opacity: 1;
      }
    }

    &.hidden {
      @extend .pop-up-leave-to;
    }
  }
  .pop-up-content {
    background-color: #253746;
    border-radius: .375rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: inline-block;
    padding-left: 1.375rem;
    padding-right: 1.375rem;
    position: relative;
    width: 100%;

    h2 {
      margin-top: 2.8125rem;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1;
      text-align: center;
    }

    &.full-width {
      display: block;
    }
  }

  // Transition
  .pop-up-enter-active,
  .pop-up-leave-active {
    transition: opacity .2s ease-in-out;
  }
  .pop-up-enter,
  .pop-up-leave-to {
    opacity: 0;

    .pop-up {
      &__wrap {
        transform: translateY(100%) scale(.9);
      }
    }
  }
</style>