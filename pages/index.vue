<template>
	<div class="index-page">
		<div class="header-wrap">
			<Header/>
		</div>
		<!-- /.header-wrap -->
		<div class="index-page__wrap">
			<div class="container-size">
				<main class="index-page__container">
					<div class="index-page__title">
						<h1 class="big-title">
							{{ $t('portfolio_below') }}
						</h1>
						<!-- /.big-title -->
					</div>
					<!-- /.index-page__title -->
					<div class="index-page__subtitle">
						<div class="subtitle">
							{{ $t('video_about_the_site') }}
						</div>
						<!-- /.subtitle -->
					</div>
					<!-- /.index-page__subtitle -->
					<div class="index-page__media-wrap">
						<div class="video-tip index-page__media">
							<img-async
								src="/img/home-face.jpg"
								background
								class="waiting-animation index-page__background-photo"
							>
							</img-async>
							<video autoplay muted loop class="inner-video index-page__video" data-video-tip="hello">
								<source-on-load src="/video/hello-1.webm" type='video/webm; codecs="vp8, vorbis"'/>
							</video>
							<!-- /.inner-video -->
						</div>
						<!-- /.index-page__media -->
						<div class="unmute-tip index-page__unmute-tip" data-video-tip-play="hello">
							<div class="unmute-tip__arrow">
								<svg class="unmute-tip__arrow-icon" width="12" height="31" fill="none" viewBox="0 0 12 31" xmlns="http://www.w3.org/2000/svg"><path d="M5 30c5-4.5 12-20-3.5-27m0 0 .5 7m-.5-7L8 1" stroke="#fff"/></svg>
							</div>
							<!-- /.unmute-tip__arrow -->
							<div class="unmute-tip-text unmute-tip__block">
								{{ $t('unmute') }} <img class="unmute-tip-text__icon" src="/img/volume-up.svg" alt>
							</div>
							<!-- /.unmute-tip-text -->
						</div>
						<!-- /.unmute-tip -->
					</div>
					<!-- /.index-page__media-wrap -->
					<div class="index-page__links">
						<div class="index-page__link">
							<NuxtLink :to="localePath('/portfolio')" class="index-link not-link-style">{{ $t('portfolio') }} <img src="/img/right-arrow-blue.svg" class="index-page__link-arrow" :alt="$t('open')"></NuxtLink>
						</div>
						<!-- /.index-page__link -->
						<div class="index-page__link">
							<NuxtLink :to="localePath('/contacts')" class="index-link not-link-style">{{ $t('contacts') }} <img src="/img/right-arrow-blue.svg" class="index-page__link-arrow" :alt="$t('open')"></NuxtLink>
						</div>
						<!-- /.index-page__link -->
					</div>
					<!-- /.index-page__links -->
				</main>
				<!-- /.index-page__container -->
			</div>
			<!-- /.container-size -->
		</div>
		<!-- /.index-page__wrap -->
		<NuxtChild :key="$route.name"/>
	</div>
	<!-- /.index-page -->
</template>

<script>
	import { VideoTip } from "../plugins/video-tip"
	export default {
		mounted() {
			if (process.browser) {
				const helloVideoTip = document.querySelector('[data-video-tip="hello"]')
				new VideoTip(helloVideoTip, undefined, {
					animationElement: helloVideoTip.parentElement
				})
			}
		},
		beforeDestroy() {
			VideoTip.destroy()
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {
		padding-top: calc((100vh - 39.75rem) / 2);
		
		&__container {
			padding-bottom: 2.375rem;
		}
		&__title {
			margin-bottom: 1rem;
		}
		&__subtitle {
			margin-bottom: 1.8125rem;
		}
		&__media-wrap {
			width: 15rem;
			height: 15rem;
			margin-left: auto;
			margin-right: auto;
			position: relative;
			margin-bottom: 2.375rem;
		}
		&__media {
			width: 100%;
			height: 100%;
			position: relative;
			border-radius: 7.5rem;
			overflow: hidden;
			cursor: pointer;
		}
		&__background-photo {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			pointer-events: none;
		}
		&__video {
			position: relative;
		}
		&__unmute-tip {
			position: absolute;
			bottom: -1.125rem;
			right: -1.5rem;
		}
		&__links {
			text-align: center;
		}
		&__link {
			margin-bottom: 1.0625rem;

			&:last-child {
				margin-bottom: 0;
			}
		}
		&__link-arrow {
			margin-left: .25rem;
			position: relative;
			bottom: .125rem;
		}
	}
	.unmute-tip {
		display: inline-block;
		cursor: pointer;

		&__arrow {
			position: absolute;
			transform: translateY(-100%);
			top: -.4375rem;
			right: 1rem;
			-webkit-tap-highlight-color: transparent;
			user-select: none;
		}
		&__arrow-icon {
			display: block;
		}
	}
	.unmute-tip-text {
		font-size: .75rem;
		font-weight: 700;
		line-height: 1;
		padding-top: .625rem;
		padding-bottom: .625rem;
		padding-left: .9375rem;
		padding-right: .9375rem;
		background-color: #253746;
		border-radius: .25rem;
		letter-spacing: .008em;

		&__icon {
			width: .5625rem;
			height: .375rem;
			position: relative;
			bottom: .0625rem;
			margin-left: .25rem;
		}
	}
	.big-title,
	.subtitle
	{
		text-align: center;
	}
	.index-link {
		display: inline-block;
		color: #80B3FF;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1;
		border-bottom: 1px #80B3FF solid;
		padding-bottom: .4375rem;
	}
</style>