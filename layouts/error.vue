<template>
  <div class="error-page">
		<div class="header-wrap">
			<Header errorpage/>
		</div>
		<!-- /.header-wrap -->
    <div class="error-page__wrap">
      <div class="container-size error-page__container-size">
        <main class="error-page__container">
          <div class="error-page__title">
            <h1 class="big-title">
              <span v-if="error.statusCode === 404">{{ $t('page_not_found') }}</span>
              <span v-else>{{ $t('an_error_occurred') }}</span>
            </h1>
            <!-- /.big-title -->
          </div>
          <!-- /.error-page__title -->
          <div class="error-page__link-wrap">
            <NuxtLink class="error-page__link not-link-style" :to="localePath('/')">{{ $t('go_to_home_page') }}</NuxtLink>
          </div>
          <!-- /.error-page__link-wrap -->
        </main>
        <!-- /.error-page__container -->
      </div>
      <!-- /.container-size -->
    </div>
    <!-- /.error-page__wrap -->
    <div class="error-page__balancer">
      <div class="header-wrap">
        <Header/>
      </div>
      <!-- /.header-wrap -->
    </div>
    <!-- /.error-page__balancer -->
  </div>
  <!-- /.error-page -->
</template>

<script>
import getHead from '~/plugins/get-head'
  export default {
    props: ['error'],
    head() {
      return getHead(this, {
        title: (this.error.statusCode === 404 ? this.$t('page_not_found') : this.$t('an_error_occurred')) + ' — ' + this.$t('ilia_vetrov') + '. ' + this.$t('web_development')
      })
    }
  }
</script>

<style lang="scss" scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: calc(100 * var(--true-vh));

    &__wrap {
      height: 100%;
    }
    &__container-size {
      height: 100%;
    }
    &__container {
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-height: 24rem) {
        display: block;
      }
    }
    &__title {
      margin-bottom: 1rem;
    }
    &__link {
      color: #80B3FF;
    }
    &__balancer {
      visibility: hidden;
      user-select: none;
      pointer-events: none;
      opacity: 0;

      @media (max-height: 24rem) {
        display: none;
      }
    }
  }
</style>