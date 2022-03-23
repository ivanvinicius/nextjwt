import { Button, Icon, ButtonProps } from '@chakra-ui/react'
import { RiArrowRightLine } from 'react-icons/ri'

type ISighInButtonProps = ButtonProps

export function SignInButton({ ...rest }: ISighInButtonProps) {
  return (
    <Button
      {...rest}
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
  )
}
