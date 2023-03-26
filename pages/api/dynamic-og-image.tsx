import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import { createClient, groq } from 'next-sanity'
import type { Image } from 'sanity'
import { apiVersion, dataset, projectId } from 'studio/sanity.client'
import { urlFor } from 'utils/urlFor'

export const config = {
  runtime: 'edge'
}

export interface OgImage {
  color: string
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'
  image: Image
}

const width = 1200
const height = 627

const dynamicOgImageHandler = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || ''
  const subtitle = searchParams.get('subtitle') || ''
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    token: process.env.NEXT_SANITY_API_TOKEN
  })
  const groqQuery = groq`*[_type == "settings"]{ ogImage }[0]`
  const {
    ogImage: {
      image,
      alignItems,
      color,
      flexDirection,
      justifyContent,
      textAlign
    }
  } = await client.fetch<{ ogImage: OgImage }>(groqQuery)
  const src = urlFor(image).width(1200).height(627).url()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          color,
          alignItems,
          flexDirection,
          justifyContent,
          textAlign
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=''
          width={width}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        />
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
    ),
    {
      width,
      height
    }
  )
}

export default dynamicOgImageHandler
