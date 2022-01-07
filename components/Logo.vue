<template>
	<nuxt-link :to="localePath('/')" class="logo-link not-link-style">
		<div :class="['logo-link__wrap', 'logo-link__wrap_' + $t('logo_lang')]">
			<img
				class="logo"
				:src="`/img/ilve-site-logo-${$t('logo_lang')}.svg`"
				:alt="$t('ilia_vetrov')"
				:title="$t('ilia_vetrov')"
			>
		</div>
		<!-- /.logo__wrap -->
	</nuxt-link>
	<!-- /.logo -->
</template>

<style lang="scss" scoped>
	.logo {
		height: 1.1875rem;
		width: auto;
		padding-bottom: .375rem;
		box-sizing: content-box;
	}
	.logo-link {
		display: inline-block;
		
		&__wrap {
			display: inline-block;
			padding-left: 1.0625rem;
			
			&_ru {
				padding-left: 1.25rem;
			}
		}
	}
</style>