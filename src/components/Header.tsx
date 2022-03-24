import { Flex, Heading, Button, Icon } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

import { useAuth } from '../contexts/Auth'

export function Header() {
  const { SignOut } = useAuth()

  function handleSignOut() {
    SignOut()
  }

  return (
    <Flex
      width="100%"
      justifyContent="center"
      borderBottom="1px"
      borderColor="gray.700"
    >
      <Flex
        flex="1"
        p="8"
        maxWidth="1120"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading letterSpacing={-4} color="cyan">
          Next JWT
        </Heading>

        <Button
          onClick={handleSignOut}
          height="56px"
          px="26"
          borderRadius="full"
          colorScheme="cyan"
          rightIcon={<Icon as={RiCloseLine} fontSize="22" />}
        >
          Sign out
        </Button>
      </Flex>
    </Flex>
  )
}
