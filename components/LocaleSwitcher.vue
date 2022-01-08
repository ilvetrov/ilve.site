<template>
	<div class="locale-switcher-wrap">
		<nuxt-link
			:to="switchLocalePath(anotherLocale.code)"
			class="locale-switcher not-link-style"
		>
			<img src="/img/right-arrow.svg" :alt="$t('switch_to')" class="locale-switcher__icon">
			{{ anotherLocale.name }}
		</nuxt-link>
	</div>
</template>

<script>
export default {
	data({$i18n}) {
		return {
			anotherLocale: $i18n.locales.find(locale => locale.code !== $i18n.locale)
		}
	},
}
</script>

<style lang="scss" scoped>
	.locale-switcher-wrap {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 11;
	}
	.locale-switcher {
		display: block;
		padding: 1rem;
		font-size: .75rem;
		color: #fff;
		font-weight: 400;
		opacity: .3;
		transition: opacity .15s;

		&__icon {
			width: .5rem;
			height: auto;
			position: relative;
			bottom: .0625rem;
		}

		&:hover, &:focus {
			opacity: 1;
		}
	}
</style>