import { ImageResponse } from '@vercel/og'
import { groqQuery } from 'hooks/data/useGetPoemPage'
import type { NextRequest } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from 'studio/sanity.client'
import type { Poem } from 'types/SanityPrimitives'
import { urlFor } from 'utils/urlFor'

export const config = {
  runtime: 'edge'
}

const width = 1200
const height = 627

const handler = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const poem = searchParams.get('poem') || ''
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    token: process.env.NEXT_SANITY_API_TOKEN
  })
  const { scan } = await client.fetch<Poem>(groqQuery, { poem })
  const src = scan.image ? urlFor(scan.image).width(1200).height(627).url() : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '4rem'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=''
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>
    ),
    {
      width,
      height
    }
  )
}

export default handler
