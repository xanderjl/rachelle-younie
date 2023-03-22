import { expect, test } from '@playwright/test'
import { gotScraping } from 'got-scraping'

test('Meta tags in server response', async ({ page }) => {
  const html = await gotScraping.get('/')

  const titleRegExp = new RegExp('<meta property="og:title" content=".+"/>')

  const imageRegExp = new RegExp('<meta property="og:title" content=".+"/>')
  const hasTitle = titleRegExp.exec(html.body)
  const hasImage = imageRegExp.exec(html.body)
  expect(hasTitle).toBeTruthy()
  expect(hasImage).toBeTruthy()
})
