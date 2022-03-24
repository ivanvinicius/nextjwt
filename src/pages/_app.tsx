import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { AppProvider } from '../contexts'
import { theme } from '../styles/theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  )
}
