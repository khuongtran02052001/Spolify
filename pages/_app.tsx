import '../style/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps /*, AppContext */ } from 'next/app'
import { RecoilRoot } from 'recoil'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <SessionProvider session={session} refetchInterval={5 * 60}>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
}

export default MyApp
