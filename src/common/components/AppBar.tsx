import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  chakra,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { useRouter } from 'next/router';
import {
  AiFillBell,
  AiFillHome,
  AiOutlineHome,
  AiOutlineInbox,
  AiOutlineMenu,
} from 'react-icons/ai';

import { AVAILABLE_LOCALES } from '../constatns/i18n';

import RouteLink from './RouteLink';

const AppBar = () => {
  const t = useTranslate();

  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  return (
    <Box shadow="md">
      <chakra.header
        bg={bg}
        borderColor="gray.600"
        borderBottomWidth={1}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button
                  as={RouteLink}
                  href="/"
                  w="full"
                  variant="ghost"
                  leftIcon={<AiFillHome />}
                >
                  {t('appbar-dashboard')}
                </Button>
                <Button
                  as={RouteLink}
                  href="/inbox"
                  w="full"
                  variant="solid"
                  colorScheme="purple"
                  leftIcon={<AiOutlineInbox />}
                >
                  {t('appbar-inbox')}
                </Button>
                <ButtonGroup variant="outline" isAttached>
                  {AVAILABLE_LOCALES.map((locale) => (
                    <Button
                      key={locale}
                      onClick={() => {
                        router.push(router.pathname, router.asPath, { locale });
                      }}
                    >
                      {locale}
                    </Button>
                  ))}
                </ButtonGroup>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Icon as={AiOutlineHome} />
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl">{t('appbar-home')}</chakra.h1>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack
              spacing={3}
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <Button
                as={RouteLink}
                href="/"
                variant="ghost"
                leftIcon={<AiFillHome />}
                size="sm"
              >
                {t('appbar-dashboard')}
              </Button>
              <Button
                as={RouteLink}
                href="/inbox"
                variant="solid"
                colorScheme="purple"
                leftIcon={<AiOutlineInbox />}
                size="sm"
              >
                {t('appbar-inbox')}
              </Button>
              <ButtonGroup size="sm" variant="outline" isAttached>
                {AVAILABLE_LOCALES.map((locale) => (
                  <Button
                    key={locale}
                    onClick={() => {
                      router.push(router.pathname, router.asPath, { locale });
                    }}
                  >
                    {locale}
                  </Button>
                ))}
              </ButtonGroup>
            </HStack>
            <chakra.a
              p={3}
              color="gray.800"
              _dark={{
                color: 'inherit',
              }}
              rounded="sm"
              _hover={{
                color: 'gray.800',
                _dark: {
                  color: 'gray.600',
                },
              }}
            >
              <AiFillBell />
              <VisuallyHidden>{t('appbar-notification')}</VisuallyHidden>
            </chakra.a>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>
      </chakra.header>
    </Box>
  );
};

export default AppBar;
