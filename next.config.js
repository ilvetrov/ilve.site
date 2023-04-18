/* eslint-disable no-param-reassign */
const langs = require('./langs.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: langs,
  webpack(config, { isServer }) {
    config.resolve.alias['@serverCore'] = 'serverCore'

    if (!isServer) {
      config.resolve.alias['@serverCore'] = false
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })

    return config
  },
  sassOptions: {
    additionalData: '@import "~/src/assets/scss/scss-only/index.scss";',
  },
  async redirects() {
    return [
      {
        source: '/email',
        destination: 'mailto:contact@ilve.site',
        permanent: false,
      },
    ]
  },
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|ico|webm|mp4)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=604800, stale-while-revalidate',
        },
      ],
    },
    {
      source: '/:all*(eot|ttf|woff|woff2)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, stale-while-revalidate',
        },
      ],
    },
  ],
}

module.exports = nextConfig
