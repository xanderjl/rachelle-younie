import { NextApiHandler } from 'next'

const exit: NextApiHandler = (req, res) => {
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default exit
