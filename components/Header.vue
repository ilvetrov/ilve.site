<template>
	<header class="header">
		<div class="header__wrap">
			<LocaleSwitcher/>
			<div class="header__logo">
				<Logo/>
			</div>
			<!-- /.header__logo -->
			<div class="header__descr">
				{{ $t('web_development') }}
			</div>
			<!-- /.header__descr -->
		</div>
		<!-- /.header__wrap -->
	</header>
	<!-- /.header -->
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.header {
		margin-top: 2.75rem;

		&__wrap {
			text-align: center;
		}
		&__logo {
			margin-bottom: .5rem;
		}
		&__descr {
			line-height: 1;
			
		}
	}
</style>