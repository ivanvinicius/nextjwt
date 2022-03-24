import {
  Flex,
  Heading,
  VStack,
  Divider,
  Box,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'
import Link from 'next/link'

import { Can } from '../components/Can'
import { serverSideApi } from '../services/api/serverSide'
import { useAuth } from '../contexts/Auth'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <Flex
      flex="1"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Heading color="cyan" letterSpacing={-3}>
        Dashboard
      </Heading>

      <Can permissions={['metrics.list']}>
        <VStack mt="16">
          <Text fontWeight="bold" size="sm" color="cyan">
            E-mail
          </Text>
          <p>{user.email}</p>

          <Divider color="gray.500" />

          <Text fontWeight="bold" size="sm" color="cyan">
            Permissions
          </Text>
          {user.permissions?.map((permission) => (
            <p key={permission}>{permission}</p>
          ))}

          <Divider color="gray.500" />

          <Text fontWeight="bold" size="sm" color="cyan">
            Role
          </Text>
          {user.roles?.map((role) => (
            <p key={role}>{role}</p>
          ))}
        </VStack>

        <Flex mt="16" flexDirection="column">
          <Text size="sm" textAlign="center">
            if you are an administrator and have metrics.list permisson,
            <br />
            access the Metrics page clicking on the link below
          </Text>

          <Box mt="8" alignSelf="center">
            <Link href="/metrics">
              <ChakraLink color="orange.400">Metrics</ChakraLink>
            </Link>
          </Box>
        </Flex>
      </Can>
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
