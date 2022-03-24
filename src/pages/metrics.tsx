import { Flex, Heading, Box, Text, Button, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'
import Head from 'next/head'

import { Header } from '../components/Header'
import { serverSideApi } from '../services/api/serverSide'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Metrics() {
  return (
    <Flex flex="1" flexDirection="column">
      <Head>
        <title>Next JWT | Metrics</title>
      </Head>

      <Header />

      <Flex mt="8" flexDirection="column" alignItems="center">
        <Flex
          p="8"
          borderRadius={8}
          width="100%"
          maxWidth="1120"
          justifyContent="center"
          flexDirection="column"
          bg="gray.800"
        >
          <Box>
            <Heading size="md" color="cyan">
              Welcome to Metrics page
            </Heading>

            <Text mt="4" color="red.500">
              This is a private page which only administrators have access.
            </Text>

            <Box mt="8" borderBottom="1px" borderColor="gray.700" />

            <Link href="/dashboard">
              <Button
                as="a"
                mt="8"
                height="56px"
                px="26"
                borderRadius="full"
                colorScheme="cyan"
                leftIcon={<Icon as={RiArrowLeftLine} fontSize="22" />}
              >
                Dashboard
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const serverApi = serverSideApi(ctx)
    await serverApi.get('/me')

    return {
      props: {}
    }
  },
  {
    roles: ['administrator'],
    permissions: ['metrics.list']
  }
)
