import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyles from '../styles/GlobalStyle';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <GlobalStyles />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}

export default MyApp
