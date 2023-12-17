'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Input,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'

interface Props {
  children: React.ReactNode
}

const Links = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Search',
    link: '/search'
  },
  {
    title: 'Favourites',
    link: '/favourites'
  }
]

import {
  FormEvent
} from 'react'

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={children.link}>
      {children.title}
    </Box>
  )
}

export function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
                boxSize="50px"
                src='https://webstockreview.net/images/skyline-clipart-smart-city-15.png'
                alt='Logo'
              />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <form action="/search">
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
            <Input type='text' name='city' id='city' placeholder='Enter a city ...' size='md' variant='outline' bg='white' borderRadius='20' borderColor='grey'></Input>
            </InputGroup>
          </form>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}