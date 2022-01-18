<template>
	<header class="header">
		<div class="header__wrap" data-header-logo>
			<LocaleSwitcher :errorpage="(typeof this.errorpage === 'string') ? true : null"/>
			<LogoWrap/>
		</div>
		<!-- /.header__wrap -->
	</header>
	<!-- /.header -->
</template>

<script>
	export default {
		props: ['errorpage']
	}
</script>

<style lang="scss" scoped>
	.header {
		padding-top: 2.75rem;

		@media (min-width: 1024px) {
			padding-top: 5.4vw;
		}
		@media (min-width: 1489px) {
			padding-top: 4rem;
		}
	}
</style>