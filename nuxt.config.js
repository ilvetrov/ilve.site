export default {
	server: {
		port: process.env.SERVER_PORT
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'ilve-site',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			// { rel: 'preload', as: 'font', href: '/fonts/manrope-300.woff2', crossorigin: 'anonymous' },
			// { rel: 'preload', as: 'font', href: '/fonts/manrope-400.woff2', crossorigin: 'anonymous' },
			// { rel: 'preload', as: 'font', href: '/fonts/manrope-700.woff2', crossorigin: 'anonymous' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/scss/global.scss',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/front/global'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/dotenv'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/i18n'
	],

	i18n: {
		locales: [
			{
				code: 'en',
				name: 'English',
				iso: 'en-US',
				file: 'en.json'
			},
			{
				code: 'ru',
				name: 'Русский',
				iso: 'ru-RU',
				file: 'ru.json'
			},
		],
		strategy: 'prefix_except_default',
		langDir: 'locales/',
		defaultLocale: 'ru'
	},

	serverMiddleware: [
		'~/api/index.js'
  ],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			sass: {
				implementation: require('sass'),
			},
			scss: {
				implementation: require('sass'),
			},
		}
	}
}
