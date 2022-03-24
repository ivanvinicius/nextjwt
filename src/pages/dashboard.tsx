import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Icon,
  HStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import Head from 'next/head'

import { Can } from '../components/Can'
import { serverSideApi } from '../services/api/serverSide'
import { useAuth } from '../contexts/Auth'
import { withSSRAuth } from '../utils/withSSRAuth'
import { Header } from '../components/Header'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Flex flex="1" flexDirection="column">
      <Head>
        <title>Next JWT | Dashboard</title>
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
          <Heading size="md" color="cyan">
            Welcome to Dashboard page
          </Heading>

          <Text mt="4" color="gray.200">
            This is a public page which everyone have access.
          </Text>

          <Box mt="8" borderBottom="1px" borderColor="gray.700" />

          <HStack
            mt="8"
            spacing="8"
            alignItems="start"
            justifyContent="space-between"
          >
            <Box width="250px">
              <Heading size="sm" mb="2" color="cyan">
                E-mail
              </Heading>

              <Text color="gray.200">{user.email}</Text>
            </Box>
            <Box width="250px">
              <Heading size="sm" mb="2" color="cyan">
                Role
              </Heading>

              {user.roles?.map((role) => (
                <Text color="gray.200" key={role}>
                  {role}
                </Text>
              ))}
            </Box>
            <Box width="250px">
              <Heading size="sm" mb="2" color="cyan">
                Permissions
              </Heading>

              {user.permissions?.map((permission) => (
                <Text color="gray.200" key={permission}>
                  {permission}
                </Text>
              ))}
            </Box>
          </HStack>

          <Can permissions={['metrics.list']} roles={['administrator']}>
            <Box mt="8" borderBottom="1px" borderColor="gray.700" />

            <Box mt="8">
              <Text color="red.500">
                Administrator role, and list metrics permission are required to
                access the Metrics.
              </Text>

              <Link href="/metrics">
                <Button
                  as="a"
                  mt="4"
                  height="56px"
                  px="26"
                  borderRadius="full"
                  colorScheme="cyan"
                  rightIcon={
                    <Icon as={RiBarChartHorizontalLine} fontSize="22" />
                  }
                >
                  Metrics
                </Button>
              </Link>
            </Box>
          </Can>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const serverApi = serverSideApi(ctx)
  await serverApi.get('/me')

  return {
    props: {}
  }
})
