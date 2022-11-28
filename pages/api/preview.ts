import { NextApiHandler } from 'next'

const preview: NextApiHandler = (req, res) => {
  res.setPreviewData({})
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default preview
