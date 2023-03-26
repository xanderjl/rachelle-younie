import { AiFillHome, AiOutlineLink } from 'react-icons/ai'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import type { StructureResolver } from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import { createOgImageUrl } from 'utils/createOgImageUrl'

const singletons = ['settings', 'navigation', 'podcastEpisodes', 'landingPage']

const baseUrl =
  process.env.NEXT_PUBLIC_URL ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(IoIosSettings)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: (doc: any) =>
                    createOgImageUrl(doc.siteTitle, 'Test Card').href
                })
                .title('OG Image Preview')
            ])
        ),
      S.listItem()
        .title('Podcast Episodes')
        .icon(FaMicrophoneAlt)
        .child(
          S.document()
            .schemaType('podcastEpisodes')
            .documentId('podcastEpisodes')
        ),
      S.listItem()
        .title('Navigation')
        .icon(AiOutlineLink)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Home Page')
        .icon(AiFillHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('homePage')
            .views([
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
        ),
      ...S.documentTypeListItems().filter(
        listItem => !singletons.includes(listItem.getId()!)
      )
    ])
