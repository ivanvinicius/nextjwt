import { FormEvent, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { RiUserLine, RiLockLine } from 'react-icons/ri'

import { Form } from '../components/Form/Form'
import { Heading } from '../components/Form/Heading'
import { Input } from '../components/Form/Input'
import { SignInButton } from '../components/Form/SignInButton'
import { Footer } from '../components/Form/Footer'
import { Container } from '../components/Form/Container'
import { useAuth } from '../contexts/Auth'
import { withSSRGuest } from '../utils/withSSRGuest'

export default function SignIn() {
  const { SignIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await SignIn({ email, password })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading />

        <Stack spacing="8" mt="8">
          <Input
            name="email"
            placeholder="E-mail"
            type="text"
            icon={RiUserLine}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            name="password"
            placeholder="Password"
            type="password"
            icon={RiLockLine}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>

        <SignInButton type="submit" />
        <Footer />
      </Form>
    </Container>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})
