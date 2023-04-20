export default function isSvgPath(path: string): boolean {
  const parts = path.split('.')

  return parts[parts.length - 1] === 'svg'
}
