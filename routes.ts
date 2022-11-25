export interface Route {
  label: string
  href: string
}

const routes: Route[] = [
  {
    label: 'about',
    href: '/about'
  },
  {
    label: 'directing',
    href: '/directing'
  },
  {
    label: 'writing',
    href: './writing'
  },
  {
    label: 'podcast',
    href: '/podcast'
  },
  {
    label: 'poems',
    href: '/poems'
  },
  {
    label: 'contact',
    href: '/contact'
  }
]

export default routes
