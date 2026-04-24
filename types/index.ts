export type PortfolioVideo = {
  title: string
  url: string
  id?: string
  embedSrc?: string  // direct embed URL for non-Vimeo videos
  thumbnail?: string // custom thumbnail image path
}

export type ShowreelConfig = {
  id: string
  title: string
  embedSrc: string
}
