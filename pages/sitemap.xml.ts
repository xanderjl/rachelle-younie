import type { GetServerSideProps } from 'next'
import { getDynamicPaths, getPoemPaths } from 'server/sitemap'
import baseUrl from 'utils/baseUrl'

const generateSiteMap = (allUrls: string[]) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(slug => {
          return `
            <url>
              <loc>${baseUrl}${slug}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>
  `
  return sitemap
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const staticRoutes = ['/', '/contact']
  const allPaths = await getDynamicPaths()
  const allPoems = await getPoemPaths()

  const allUrls = [...staticRoutes, ...allPaths, ...allPoems]

  const deduped = allUrls.filter((c: string, index: number) => {
    return allUrls.indexOf(c) === index
  })

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(deduped)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
