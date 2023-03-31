import Link from 'next/link'
import useLang from '~/langs/useLang'

export default function Biba() {
  const { dict, nextLang } = useLang()

  return (
    <>
      <div>
        <Link href="/biba" locale={nextLang}>
          Change to {nextLang}
        </Link>
      </div>
      <Link href="/">{dict.ilia_vetrov}</Link>
    </>
  )
}
