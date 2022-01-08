<template>
  <div class="logo-wrap">
    <div class="logo-wrap__logo">
      <Logo/>
    </div>
    <!-- /.logo-wrap__logo -->
    <div class="logo-wrap__descr">
      {{ $t('web_development') }}
    </div>
    <!-- /.logo-wrap__descr -->
  </div>
  <!-- /.logo-wrap -->
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .logo-wrap {
    text-align: center;

		&__logo {
			margin-bottom: .5rem;
		}
		&__descr {
			line-height: 1;
		}
  }
</style>