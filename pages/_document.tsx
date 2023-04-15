import { Html, Head, Main, NextScript } from 'next/document'
import { rootPortalId } from '~/components/RootPortal/RootPortal'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id={rootPortalId}></div>
        <NextScript />
      </body>
    </Html>
  )
}
