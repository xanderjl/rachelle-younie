import type { NextApiHandler } from 'next'

const exit: NextApiHandler = (req, res) => {
  const { query } = req

  res.clearPreviewData()
  res.writeHead(307, { Location: query?.slug ? `/${query.slug}` : '/' })
  res.end()
}

export default exit
