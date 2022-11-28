import { StructureResolver } from 'sanity/desk'
import { AiOutlineLink } from 'react-icons/ai'
import { IoIosSettings } from 'react-icons/io'

const singletons = ['settings', 'navigation', 'podcastEpisodes']

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(IoIosSettings)
        .child(S.document().schemaType('settings').documentId('settings')),
      S.listItem()
        .title('Navigation')
        .icon(AiOutlineLink)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Podcast Episodes')
        .icon(AiOutlineLink)
        .child(
          S.document()
            .schemaType('podcastEpisodes')
            .documentId('podcastEpisodes')
        ),
      ...S.documentTypeListItems().filter(
        listItem => !singletons.includes(listItem.getId()!)
      )
    ])
