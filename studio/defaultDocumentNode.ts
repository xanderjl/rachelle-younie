import type { DefaultDocumentNodeResolver } from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `page`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: any) =>
              doc?.slug?.current
                ? `${baseUrl}/api/preview?slug=${doc.slug.current}`
                : `${baseUrl}/api/preview`
          })
          .title('Preview')
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
