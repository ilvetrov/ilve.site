<template>
	<div class="locale-switcher-wrap">
		<nuxt-link
			v-if="checkNotErrorPage()"
			:to="switchLocalePath(anotherLocale.code)"
			no-prefetch
			class="locale-switcher not-link-style"
			:title="$t('switch_to', anotherLocale.code) + ' ' + anotherLocale.name"
		>
			<img-async src="/img/right-arrow.svg" :alt="$t('switch_to', anotherLocale.code)" class="locale-switcher__icon"/>
			{{ anotherLocale.name }}
		</nuxt-link>
		<a
			v-else
			:href="customRoute(anotherLocale.code)"
			class="locale-switcher not-link-style"
			:title="$t('switch_to', anotherLocale.code) + ' ' + anotherLocale.name"
		>
			<img-async src="/img/right-arrow.svg" :alt="$t('switch_to', anotherLocale.code)" class="locale-switcher__icon"/>
			{{ anotherLocale.name }}
		</a>
	</div>
</template>

<script>
export default {
	data({$i18n}) {
		return {
			anotherLocale: $i18n.locales.find(locale => locale.code !== $i18n.locale)
		}
	},
	props: ['errorpage'],
	methods: {
		customRoute(to) {
			if (this.$route.path === '/') return '/' + this.anotherLocale + '/'

			const regexp = new RegExp('^\/(' + this.$i18n.locales.map(locale => `(${locale.code})`).join('|') + ')\/')

			if (this.$i18n.locale === this.$i18n.defaultLocale) {
				return '/' + to + this.$route.path
			} else {
				return this.$route.path.replace(regexp, '/')
			}
		},
		checkNotErrorPage() {
			return typeof this.errorpage === 'object'
		}
	}
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