import React, { memo } from 'react';
import {
  Box,
  Button,
  useDisclosure,
  useColorMode,
  HStack,
  IconButton,
  Image,
  Container,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink as RouterLink, Link, useLocation } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
}

const Links = ['Home', 'Blog'];

const NavLink = (props: Props) => {
  const { to, children } = props;
  return (
    <Box
      as={RouterLink}
      px={2}
      py={1}
      color="white"
      rounded={'md'}
      _activeLink={{
        borderBottom: '2px solid #E95E30',
        borderRadius: '0',
      }}
      to={to}
    >
      {children}
    </Box>
  );
};

const MenuTop:React.FC = memo(() => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation()

  return (
    <>
      <Box
        top={0}
        width="100%"
        bgImage={`${process.env.PUBLIC_URL}/mask.png`}
        bgRepeat="no-repeat"
        height="208px"
      >
        <Container maxW={'container.lg'} as="header" alignItems={'center'}>
          <HStack
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            pt={8}
          >
            <Box as={Link} to={'/'}>
              <Image src={`${process.env.PUBLIC_URL}/SB_logo.svg`} alt="Logo" />
            </Box>
            <HStack
              as={'nav'}
              spacing={2}
              display={{ base: 'none', md: 'flex' }}
              color={'white'}
            >
              {Links.map((link) => (
                <NavLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </NavLink>
              ))}
                    <Flex justifyContent="flex-end"> 
            <Button
                onClick={toggleColorMode}
                variant="custom"
                colorScheme="orange"
                display={{ base: 'none', md: 'flex' }}
              >
                {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
              </Button>
              </Flex>
            </HStack>
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              variant="custom"
              colorScheme="orange"
              mr={2}
            />
          </HStack>
          <Flex justifyContent={"center"}>
          {location.pathname==="/blog" && <Heading>Blog</Heading> }
          </Flex>
        </Container>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Container
              maxW={'container.lg'}
              as={'nav'}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              {Links.map((link) => (
                <NavLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </NavLink>
              ))}
              <Button
                mt={2}
                mr={2}
                onClick={toggleColorMode}
                variant="custom"
                colorScheme="orange"
              >
                {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Container>
          </Box>
        ) : null}
      </Box>
    </>
  );
})

export default MenuTop;
