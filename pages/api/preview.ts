import type { NextApiHandler } from 'next'

const preview: NextApiHandler = (_, res) => {
  res.setPreviewData({})
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default preview
