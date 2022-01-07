<template>
  <div class="portfolio-project">
    <div class="portfolio-project__title">
      <strong>{{ project.title }}</strong>
      <div v-if="project.descr">{{ project.descr }}</div>
    </div>
    <!-- /.portfolio-project__title -->
    <div class="portfolio-project__media">
      <img-async :src="'/img/' + project.img" :alt="project.title + ' ' + project.descr" class="portfolio-project__img"/>
    </div>
    <!-- /.portfolio-project__media -->
    <div class="portfolio-project__buttons">

      <div class="portfolio-project__button">
        <a :href="`${project.link}?demo-lang=${this.$i18n.locale}`" target="_blank" class="wide-button not-link-style">
          <span>{{ $t('open') }}</span>
        </a>
        <!-- /.wide-button -->
      </div>
      <!-- /.portfolio-project__button -->

      <div class="portfolio-project__button only-desktop">
        <button @click="showPopUp('project-qr-' + project.qr)" target="_blank" class="wide-button not-button-style">
          <span>{{ $t('open_on_phone') }}</span>
        </button>
        <!-- /.wide-button -->
      </div>
      <!-- /.portfolio-project__button -->

      <div v-if="project.guide" class="portfolio-project__button">
        <a :href="project.guide" target="_blank" class="wide-button not-link-style">
          <span>{{ $t('admin_panel_guide') }}</span>
        </a>
        <!-- /.wide-button -->
      </div>
      <!-- /.portfolio-project__button -->

    </div>
    <!-- /.portfolio-project__buttons -->

    <QrPopUp
      v-if="project.qr"
      :data="{
        qr: project.qr,
        title: project.title,
        name: 'project-qr-' + project.qr
      }"
    />
  </div>
  <!-- /.portfolio-project -->
</template>

<script>
  import { showPopUp } from '~/plugins/pop-up'
  export default {
    props: {
      projectEntity: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        project: this.$props.projectEntity
      }
    },
    methods: {
      showPopUp
    }
  }
</script>

<style lang="scss" scoped>
  .portfolio-project {
    &__title {
      text-align: center;
      margin-bottom: 1.3125rem;
    }
    &__media {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
    }
    &__img {
      width: 100%;
      height: auto;
      border-radius: .25rem;
      max-width: 40rem;
    }
    &__buttons {
    }
    &__button {
      margin-bottom: .5rem;

      @media (min-width: 493px) {
        display: flex;
        justify-content: center;
      }

      &.only-desktop {
        @media (max-width: 1024px) {
          display: none;
        }
      }
    }
  }
</style>