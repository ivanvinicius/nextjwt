import { Text, Link } from '@chakra-ui/react'

export function Footer() {
  return (
    <Link mt="16" alignSelf="center" _hover={{ textDecoration: false }}>
      <Text color="gray.200">Forgot your password?</Text>
    </Link>
  )
}
