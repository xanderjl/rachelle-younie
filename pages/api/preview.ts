import type { NextApiHandler } from 'next'

const preview: NextApiHandler = (req, res) => {
  const { slug } = req.query

  res.setPreviewData({})
  res.writeHead(307, { Location: slug ? `/${slug}` : '/' })
  res.end()
}

export default preview
