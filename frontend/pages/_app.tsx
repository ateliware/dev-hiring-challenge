import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../components/AppProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="bg-teal-700 flex justify-center h-screen items-center">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}

export default MyApp
