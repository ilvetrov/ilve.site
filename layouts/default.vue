<template>
	<div class="site">
		<Backdrops/>
		<nuxt/>
	</div>
	<!-- /.site -->
</template>

<script>
export default {
	head() {
		return this.$nuxtI18nHead({ addSeoAttributes: true })
	},
	mounted() {
		console.log(this.$i18n.localeCodes[0])
	}
}
</script>