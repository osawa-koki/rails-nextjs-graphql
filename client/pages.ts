interface Page {
  emoji: string
  path: string
  name: string
}

const pages: Page[] = [
  {
    emoji: '🏠',
    path: '/',
    name: 'Home'
  },
  {
    emoji: '📖',
    path: '/about/',
    name: 'About'
  },
  {
    emoji: '💓',
    path: '/contact/',
    name: 'Contact'
  },
  {
    emoji: '📄',
    path: '/modal/',
    name: 'Modal'
  },
  {
    emoji: '❣️',
    path: '/items/',
    name: 'Items'
  }
]

export default pages
