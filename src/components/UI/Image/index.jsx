export default function Image({ className, onClick, alt, width, height, src }) {
  return <img alt={alt} src={src} onClick={onClick} className={className} width={width} height={height} />
}
