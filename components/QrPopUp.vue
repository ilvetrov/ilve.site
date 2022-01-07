<template>
  <PopUp
    class="hidden disabled"
    wrapClass="pop-up-qr-wrap"
    :name="data.name"
    plain
  >
    <div class="pop-up-qr">
      <div class="pop-up-qr__wrap">
        <div class="pop-up-qr__img-wrap">
          <div class="pop-up-qr__title">
            {{ data.title }}
          </div>
          <!-- /.pop-up-qr__title -->
          <img :src="'/img/' + data.qr" class="pop-up-qr__img" :alt="$t('qr_code')">
        </div>
        <!-- /.pop-up-qr__img-wrap -->
      </div>
      <!-- /.pop-up-qr__wrap -->
    </div>
    <!-- /.pop-up-qr -->
  </PopUp>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .pop-up-qr-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .pop-up-qr {
    position: relative;
    width: 100%;
    height: 100%;
    padding: .875rem;

    &__title {
      text-align: center;
      font-weight: 400;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    &__wrap {
      position: relative;
      width: 100%;
      height: 100%;
    }
    &__img-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 100%;
      height: auto;
      max-height: 100%;

      @media (min-width: 426px) {
        max-width: 18rem;
      }
    }
    &__img {
      width: 100%;
      height: 100%;
      border-radius: .25rem;
    }
  }
</style>