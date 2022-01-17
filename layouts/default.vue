<template>
	<div class="site">
		<Setup/>
		<Backdrops/>
		<nuxt/>
	</div>
	<!-- /.site -->
</template>

<script>
import getHead from '~/plugins/get-head'
export default {
	head() {
		return {
			...this.$nuxtI18nHead({ addSeoAttributes: true }),
			...getHead(this, {}, {}, true)
		}
	}
}
</script>