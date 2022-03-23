import { ElementType } from 'react'
import {
  Flex,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

interface IInputBaseProps extends ChakraInputProps {
  name: string
  placeholder: string
  icon: ElementType
}

export function Input({ name, placeholder, icon, ...rest }: IInputBaseProps) {
  return (
    <Flex
      as="label"
      htmlFor={name}
      py="4"
      px="8"
      align="center"
      color="gray.200"
      bg="gray.700"
      borderRadius="full"
      height="56px"
    >
      <Icon as={icon} fontSize="22" color="gray.200" />
      <ChakraInput
        {...rest}
        id={name}
        name={name}
        type="text"
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder={placeholder}
        _placeholder={{
          color: 'gray.400'
        }}
      />
    </Flex>
  )
}
