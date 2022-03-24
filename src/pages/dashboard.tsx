import { Flex, Heading, VStack, Divider } from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

import { useAuth } from '../contexts/Auth'
import { api } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    async function loadUserInfo() {
      const { 'nextjwt.token': token } = parseCookies()

      if (token) {
        try {
          await api.get('/me')
        } catch (err) {
          console.log('DASHBOARD/ME REQ ERROR', err)
        }
      }
    }

    loadUserInfo()
  }, [])

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

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
})
