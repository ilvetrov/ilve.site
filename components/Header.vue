<template>
	<header class="header">
		<div class="header__wrap" data-header-logo>
			<LocaleSwitcher/>
			<LogoWrap/>
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

		@media (min-width: 1024px) {
			margin-top: 5.4vw;
		}
		@media (min-width: 1489px) {
			margin-top: 4rem;
		}
	}
</style>