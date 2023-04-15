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
}

module.exports = nextConfig
