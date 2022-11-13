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
    'gatsby-plugin-pnpm'
  ],
  developMiddleware: (app) => {
    app.use('/api', createProxyMiddleware({
      target: 'http://127.0.0.1:3000'
    }))
  },
  trailingSlash: 'never'
}

export default config
