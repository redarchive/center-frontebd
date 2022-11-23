import type { GatsbyConfig } from 'gatsby'
import { createProxyMiddleware } from 'http-proxy-middleware'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'gbswcenter',
    siteUrl: 'https://gbsw.hs.kr'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-pnpm',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '경북소프트웨어고 포트폴리오',
        short_name: '경소고 포트폴리오',
        start_url: '/',
        background_color: '#f5f5f5',
        theme_color: '#2A9CD4',
        display: 'standalone',
        icon: 'src/favicon.svg',
        cache_busting_mode: 'none'
      }
    }
  ],
  developMiddleware: (app) => {
    app.use('/api', createProxyMiddleware({
      target: 'http://127.0.0.1:3000'
    }))
  },
  trailingSlash: 'never'
}

export default config
