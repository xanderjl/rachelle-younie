import { getPages } from 'hooks/data/useGetPages'

export const getDynamicPaths = async (): Promise<string[]> => {
  const pages = await getPages()
  const paths = pages.filter(page => !!page).map(({ slug }) => `/${slug}`)

  return paths
}
