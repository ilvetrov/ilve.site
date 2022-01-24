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
						<div
							:class="{
								'video-tip index-page__media': true,
								'centered': db.getHelloVideo()[0].centered
							}"
							:style="db.getHelloVideo()[0].position ? `--position: ${db.getHelloVideo()[0].position}` : null"
						>
							<img-async
								src="/img/home-face.jpg"
								background
								class="waiting-animation index-page__background-photo"
							>
							</img-async>
							<video
								autoplay
								muted
								loop
								class="inner-video index-page__video inactive"
								data-video-tip="hello"
							>
								<source-on-load
									v-for="video in db.getHelloVideo()"
									:key="video.src"
									:src="video.src"
									:type="video.type"
								/>
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
								{{ $t('unmute') }} <img-async class="unmute-tip-text__icon" src="/img/volume-up.svg" alt/>
							</div>
							<!-- /.unmute-tip-text -->
						</div>
						<!-- /.unmute-tip -->
					</div>
					<!-- /.index-page__media-wrap -->
					<div class="index-page__links">
						<div class="index-page__link">
							<NuxtLink :to="localePath('/portfolio')" no-prefetch class="index-link not-link-style">{{ $t('portfolio') }} <img-async src="/img/right-arrow-blue.svg" class="index-link__arrow" :alt="$t('open')"/></NuxtLink>
						</div>
						<!-- /.index-page__link -->
						<div class="index-page__link">
							<NuxtLink :to="localePath('/contacts')" prefetch class="index-link not-link-style">{{ $t('contacts') }} <img-async src="/img/right-arrow-blue.svg" class="index-link__arrow" :alt="$t('open')"/></NuxtLink>
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
		{{ saveAB() }}
	</div>
	<!-- /.index-page -->
</template>

<script>
import { DB } from '~/db'
import { VideoTip } from "../plugins/video-tip"
import { checkLoadEvent } from "../plugins/check-load-event";
import { preloadImages } from "../plugins/preload-images";
import getHead from '~/plugins/get-head';
import ABTesting from '~/plugins/ab-testing';
import { metrics } from '~/plugins/metrics';
export default {
	data() {
		return {
			abTesting: (ABTesting.getter(this)),
			db: new DB(this)
		}
	},
	head() {
		return getHead(this)
	},
	mounted() {
		const helloVideoTip = document.querySelector('[data-video-tip="hello"]')
		new VideoTip(helloVideoTip, undefined, {
			animationElement: helloVideoTip.parentElement,
			playCallback: () => {
				metrics.reachGoal('hello_video_play', {
					once: true,
					ab: ['db_hello_video']
				})
				metrics.reachGoal(`hello_video_play_${ABTesting.getter(this).selectedLabels['db_hello_video']}`, {
					once: true
				})
			},
			watchedCallback: () => {
				metrics.reachGoal('hello_video_watched', {
					once: true,
					ab: ['db_hello_video']
				})
				metrics.reachGoal(`hello_video_watched_${ABTesting.getter(this).selectedLabels['db_hello_video']}`, {
					once: true
				})
			},
		})

		if (checkLoadEvent()) {
			setTimeout(() => this.preloadOtherImages(), 1000)
		} else {
			window.addEventListener('load', () => setTimeout(() => this.preloadOtherImages(), 1000))
		}
	},
	beforeDestroy() {
		VideoTip.destroy()
	},
	methods: {
		preloadOtherImages() {
			preloadImages(this.getImagesForPreload())
		},
		getImagesForPreload() {
			return [
				...this.getContactsIcons(),
				'/img/qr-icon.svg',
				'/img/close.svg',
			]
		},
		getContactsIcons() {
			return this.db.getContacts().map(contact => contact.icon)
		},
		saveAB() {
			this.abTesting.save()
		},
		reachGoal: (...attrs) => metrics.reachGoal(...attrs)
	}
}
</script>

<style lang="scss" scoped>
	.index-page {
		padding-top: calc((100vh - 39.75rem) / 2);

		@media (min-width: 1024px) {
			padding-top: calc((100vh - 42.5rem) / 2);

			@media (max-height: 849px) {
				padding-top: 0;
			}
		}
		
		&__container {
			padding-bottom: 2.375rem;

			@media (min-width: 1024px) {
				padding-bottom: 5.4vw;
			}
			@media (min-width: 1489px) {
				padding-bottom: 4rem;
			}
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
			display: flex;
			align-items: center;
		}
		&__media, &__background-photo, &__video {
			border-radius: 7.5rem;
		}
		&__media {
			width: 100%;
			max-height: 100%;
			min-height: 100%;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			will-change: max-height, transform, border-radius;

			&.centered {
				display: flex;
				align-items: center;
			}
			&.active {
				max-height: 200%;
				border-radius: .25rem;
			}
		}
		&__background-photo, &__video {
			transition: all .2s ease-out;
			will-change: border-radius, transform;
		}
		&__background-photo {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			pointer-events: none;
		}
		&__video {
			position: relative;
		}
		&__media.active & {
			&__background-photo, &__video {
				border-radius: .25rem;
			}
			&__background-photo {
				transform: translateY(var(--position, 0px));
			}
		}
		&__media:not(.active) & {
			&__video {
				transform: translateY(var(--position, 0px));
			}
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
		transition: background-color .15s;

		&__icon {
			width: .5625rem;
			height: .375rem;
			position: relative;
			bottom: .0625rem;
			margin-left: .25rem;
		}

		&:hover, &:focus {
			background-color: #334656;
		}
	}
	.big-title,
	.subtitle
	{
		text-align: center;
	}
	.index-link {
		position: relative;
		display: inline-block;
		color: #80B3FF;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1;
		padding-bottom: .5rem;
		transition: color .15s;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 1px;
			background-color: #80B3FF;
			transition: background-color .15s, transform .15s;
		}

		&__arrow {
			margin-left: .25rem;
			position: relative;
			bottom: .125rem;
			transition: transform .15s;
		}

		&:hover, &:focus {
			color: #a3c8ff;

			&::after {
				transform: translateY(.125rem);
				background-color: #a3c8ff;
			}
		}

		&:hover &, &:focus & {
			&__arrow {
				transform: translateX(.125rem);
			}
		}
	}
</style>