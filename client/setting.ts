import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

export default {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:3000',
  title: '🦑 Rails Next.js GraphQL Client 🦑',
  description: '🦑 Rails Next.js GraphQL Client 🦑',
  keywords: []
}
