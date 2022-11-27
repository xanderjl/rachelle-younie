import { StructureResolver } from 'sanity/desk'

const singletons = ['settings']

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('settings').documentId('settings')),
      ...S.documentTypeListItems().filter(
        listItem => !singletons.includes(listItem.getId()!)
      )
    ])
