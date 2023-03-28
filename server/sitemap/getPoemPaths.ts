import { getPoemRoutes } from 'hooks/data/useGetPoemRoutes'

export const getPoemPaths = async (): Promise<string[]> => {
  const poemRoutes = await getPoemRoutes()
  const paths = poemRoutes
    .map(({ slug, poems }) =>
      poems.filter(poem => !!poem).map(({ poem }) => `/${slug}/${poem}`)
    )
    .flat(1)

  return paths
}
