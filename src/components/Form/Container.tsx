import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

interface IContainerProps {
  children: React.ReactNode
}

export function Container({ children }: IContainerProps) {
  return (
    <Flex w={'100vw'} h={'100vh'} align={'center'} justify={'center'}>
      <Head>
        <title>NextJWT | Sign in</title>
      </Head>
      {children}
    </Flex>
  )
}
