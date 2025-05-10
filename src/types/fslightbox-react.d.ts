declare module 'fslightbox-react' {
  interface FsLightboxProps {
    toggler: boolean
    sources: string[]
    slide?: number
    onClose?: () => void
    loadOnlyCurrentSource?: boolean
  }

  const FsLightbox: React.FC<FsLightboxProps>
  export default FsLightbox
}
