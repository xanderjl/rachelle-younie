declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE: 'true' | 'false'
    NODE_ENV: 'development' | 'production' | 'test'
    VERCEL_ENV: 'production' | 'preview' | 'development'
    VERCEL_URL: string
    NEXT_SHA_KEY: string
    NEXT_PUBLIC_FORMSPREE_KEY: string
    NEXT_PUBLIC_MEASUREMENT_ID: string
    NEXT_PUBLIC_SANITY_API_VERSION: string
    NEXT_PUBLIC_SANITY_DATASET: string
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    NEXT_SANITY_API_TOKEN: string
    NEXT_PUBLIC_RSS_URL: string
    NEXT_PUBLIC_VERCEL_URL: string
  }
}
