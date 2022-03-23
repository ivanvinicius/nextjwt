import { Flex, FormControlProps } from '@chakra-ui/react'

interface IFormProps extends FormControlProps {
  children: React.ReactNode
}

export function Form({ children, ...rest }: IFormProps) {
  return (
    <Flex
      {...rest}
      as={'form'}
      w={'100%'}
      py="40"
      px="16"
      flexDir="column"
      maxW={580}
      bg={'gray.800'}
      borderRadius={8}
    >
      {children}
    </Flex>
  )
}
