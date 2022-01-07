<template>
	<div class="portfolio-page">
		<div class="header-wrap">
			<Header/>
		</div>
		<!-- /.header-wrap -->
		<div class="portfolio-page__wrap">
			<div class="container-size">
				<div class="portfolio-page__container">
					<div class="portfolio-page__title">
						<h1 class="big-title">{{ $t('portfolio') }}</h1>
					</div>
					<!-- /.portfolio-page__title -->
					<div class="porftolio-page__list">
						<div
							v-for="project in db.getPortfolio()"
							:key="project.link"
							class="portfolio-page__item"
						>
							<PortfolioProject
								:projectEntity="project"
							/>
						</div>
						<!-- /.portfolio-page__item -->
					</div>
					<!-- /.porftolio-page__list -->
				</div>
				<!-- /.portfolio-page__container -->
			</div>
			<!-- /.container-size -->
		</div>
		<!-- /.portfolio-page__wrap -->
	</div>
	<!-- /.portfolio-page -->
</template>

<script>
import { DB } from '~/db'
	export default {
		data() {
			return {
				db: new DB(this.$i18n.locale, (key) => this.$i18n.t(key))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.portfolio-page {
		&__title {
			margin-bottom: 2.375rem;

			@media (min-width: 1024px) {
				margin-bottom: 4.64vw;
			}
			@media (min-width: 1379px) {
				margin-bottom: 3.2rem;
			}
		}
		&__item {
			margin-bottom: 2.125rem;

			@media (min-width: 1024px) {
				margin-bottom: 4.64vw;
			}
			@media (min-width: 1379px) {
				margin-bottom: 3.2rem;
			}
		}
	}
	.big-title {
		text-align: center;
	}
</style>