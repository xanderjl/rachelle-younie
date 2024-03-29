import { createHmac } from 'crypto'
import { AiFillHome, AiOutlineLink } from 'react-icons/ai'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import type { StructureResolver } from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import baseUrl from 'utils/baseUrl'
import { createOgImageUrl } from 'utils/createOgImageUrl'

const singletons = ['settings', 'navigation', 'podcastEpisodes', 'landingPage']

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
                  url: (doc: any) => {
                    const hmac = createHmac('sha256', process.env.NEXT_SHA_KEY)
                    hmac.update(JSON.stringify({ slug: 'home' }))
                    const token = hmac.digest('hex')
                    return createOgImageUrl(
                      doc.siteTitle,
                      'Test Card',
                      'home',
                      token
                    ).href
                  }
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
                  url: () => `${baseUrl}/api/preview`
                })
                .title('Preview')
            ])
        ),
      ...S.documentTypeListItems().filter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        listItem => !singletons.includes(listItem.getId()!)
      )
    ])
