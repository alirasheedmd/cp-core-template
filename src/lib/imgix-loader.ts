import type { ImageLoaderProps } from 'next/image'

interface LoaderProps extends ImageLoaderProps {
  height?: number
}

export const imgixLoader = ({ src, width, height, quality }: LoaderProps) => {
  const url = new URL(src)

  url.searchParams.set('w', width.toString())

  url.searchParams.set('auto', 'format,compress')
  if (height) url.searchParams.set('h', height.toString())
  if (quality) url.searchParams.set('q', quality.toString())

  const baseUrl = process.env.NEXT_PUBLIC_IMGIX_URL?.replace(/\/+$/, '')
  const path = url.pathname.replace(/^\/+/, '')

  if (!baseUrl) return url.toString()

  return `${baseUrl}/${path}?${url.searchParams.toString()}`
}

export const normalizeImageUrl = (src: string) => {
  try {
    const url = new URL(src)
    url.pathname = `/${url.pathname.replace(/^\/+/, '')}`
    return url.toString()
  } catch {
    return src
  }
}
