import Head from 'next/head'
import {
  Flex,
  Stack,
  Button,
  Icon,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'
import { RiUserLine, RiLockLine, RiArrowRightLine } from 'react-icons/ri'

import { Input } from '../components/Input'

export default function SignIn() {
  return (
    <Flex w={'100vw'} h={'100vh'} align={'center'} justify={'center'}>
      <Head>
        <title>NextJWT | Sign in</title>
      </Head>

      <Flex
        as={'form'}
        w={'100%'}
        py="40"
        px="16"
        flexDir="column"
        maxW={580}
        bg={'gray.800'}
        borderRadius={8}
      >
        <Flex align="center" justify="center" direction="column">
          <Heading letterSpacing={-4} color="cyan">
            Next JWT
          </Heading>

          <Text letterSpacing={-1} mt="8" fontSize="18" color="gray.200">
            Hey, sign in to your account! 👋
          </Text>
        </Flex>

        <Stack spacing="8" mt="8">
          <Input name="email" placeholder="E-mail" icon={RiUserLine} />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            icon={RiLockLine}
          />
        </Stack>

        <Button
          type="submit"
          mt="8"
          colorScheme="cyan"
          color="white"
          size="lg"
          borderRadius="full"
          height="56px"
          rightIcon={<Icon as={RiArrowRightLine} fontSize="22" />}
        >
          Sign in
        </Button>

        <Link mt="16" alignSelf="center" _hover={{ textDecoration: false }}>
          <Text color="gray.200">Forgot your password?</Text>
        </Link>
      </Flex>
    </Flex>
  )
}
