import { Flex, Heading as ChakraHeading, Text } from '@chakra-ui/react'

export function Heading() {
  return (
    <Flex align="center" justify="center" direction="column">
      <ChakraHeading letterSpacing={-4} color="cyan">
        Next JWT
      </ChakraHeading>

      <Text letterSpacing={-1} mt="8" fontSize="18" color="gray.200">
        Hey, sign in to your account! 👋
      </Text>
    </Flex>
  )
}
