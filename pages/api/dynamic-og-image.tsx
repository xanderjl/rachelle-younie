import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import { createClient, groq } from 'next-sanity'
import type { Image } from 'sanity'
import { apiVersion, dataset, projectId } from 'studio/sanity.client'
import type {
  AlignItems,
  FlexDirection,
  JustifyContent,
  TextAlign
} from 'types/SanityPrimitives'
import { urlFor } from 'utils/urlFor'

export const config = {
  runtime: 'edge'
}

export interface OgImage {
  color: string
  alignItems: AlignItems
  flexDirection: FlexDirection
  justifyContent: JustifyContent
  textAlign: TextAlign
  image: Image
}

const width = 1200
const height = 627

const font = fetch(
  new URL('../../assets/fonts/DMSerifDisplay-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer())

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
  const fontData = await font

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'DM Serif Display',
          padding: '4rem',
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            color
          }}
        />
        <div
          style={{
            fontSize: '72px'
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: '100%',
            borderTopWidth: '2px',
            borderColor: color
          }}
        />
        <div
          style={{
            fontSize: '48px'
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: [
        {
          name: 'DM Serif Display',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  )
}

export default dynamicOgImageHandler
