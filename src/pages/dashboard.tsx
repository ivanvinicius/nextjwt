import { Flex, Heading, VStack, Divider } from '@chakra-ui/react'

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

      <VStack mt="16">
        <Heading size="sm" color="cyan">
          E-mail
        </Heading>
        <p>{user.email}</p>

        <Divider color="gray.500" />

        <Heading size="sm" color="cyan">
          Permissions
        </Heading>
        {user.permissions?.map((permission) => (
          <p key={permission}>{permission}</p>
        ))}

        <Divider color="gray.500" />

        <Heading size="sm" color="cyan">
          Roles
        </Heading>
        {user.roles?.map((role) => (
          <p key={role}>{role}</p>
        ))}
      </VStack>
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
