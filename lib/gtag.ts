export const pageview = (url: string) => {
  if (window !== undefined) {
    window.gtag('config', process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
      page_path: url
    })
  }
}
