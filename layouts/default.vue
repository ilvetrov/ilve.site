<template>
	<div class="site">
		<Setup/>
		<Backdrops/>
		<nuxt/>
	</div>
	<!-- /.site -->
</template>

<script>
export default {
	head() {
		return {
			...this.$nuxtI18nHead({ addSeoAttributes: true })
		}
	}
}
</script>