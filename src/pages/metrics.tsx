import { Flex, Heading } from '@chakra-ui/react'

import { serverSideApi } from '../services/api/serverSide'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Metrics() {
  return (
    <Flex
      flex="1"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Heading color="cyan" letterSpacing={-3}>
        Metrics
      </Heading>
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
    permissions: ['metrics.list'],
    roles: ['administrator']
  }
)
