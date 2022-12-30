import { AiFillHome, AiOutlineLink } from 'react-icons/ai'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { StructureResolver } from 'sanity/desk'

const singletons = ['settings', 'navigation', 'podcastEpisodes', 'landingPage']

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(IoIosSettings)
        .child(S.document().schemaType('settings').documentId('settings')),
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
        .child(S.document().schemaType('page').documentId('homePage')),
      ...S.documentTypeListItems().filter(
        listItem => !singletons.includes(listItem.getId()!)
      )
    ])
