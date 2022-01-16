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
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'msapplication-TileColor', content: '#da532c' },
			{ name: 'theme-color', content: '#1a1c21' },
		],
		link: [
			{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
			{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
			{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
			{ rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/apple-touch-icon.png' },
			{ rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
			{ rel: 'manifest', href: '/site.webmanifest' },
			{ rel: 'preload', as: 'font', href: '/fonts/manrope-300.woff2', crossorigin: 'anonymous' },
			{ rel: 'preload', as: 'font', href: '/fonts/manrope-400.woff2', crossorigin: 'anonymous' },
			{ rel: 'preload', as: 'font', href: '/fonts/manrope-700.woff2', crossorigin: 'anonymous' }
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
		'@nuxtjs/i18n',
		'@nuxtjs/redirect-module',
		'cookie-universal-nuxt'
	],

	router: {
		trailingSlash: true
	},

	redirect: [
		{
			from: '(?!^\/$|^\/[?].*$)(.*\/[?](.*)$|.*[^/]$)',
			to: (from, req) => {
				const base = req._parsedUrl.pathname + '/';
				const search = req._parsedUrl.search;
				return base + (search != null ? search : '');
			},
			statusCode: 301
		},
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
		defaultLocale: 'ru',
		detectBrowserLanguage: false
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
