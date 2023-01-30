import type { NextApiHandler } from 'next'

const exit: NextApiHandler = (_, res) => {
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default exit
