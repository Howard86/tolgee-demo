import { Box, Button, chakra, Flex, HStack } from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import Head from 'next/head';

import AppBar from '@/common/components/AppBar';
import { getStaticLocaleProps } from '@/common/utils/static-props';

const NewPage = (): JSX.Element => {
  const t = useTranslate();
  return (
    <>
      <Head>
        <title>{t('inbox-title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <Flex px={4} py={32} mx="auto">
        <Box
          mx="auto"
          w={{
            lg: 8 / 12,
            xl: 5 / 12,
          }}
        >
          <chakra.p
            mb={2}
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            color="gray.400"
            textTransform="uppercase"
          >
            {t('inbox-tag')}
          </chakra.p>
          <chakra.h1
            mb={3}
            fontSize={{
              base: '3xl',
              md: '4xl',
            }}
            fontWeight="bold"
            lineHeight="shorter"
            color="gray.900"
            _dark={{
              color: 'white',
            }}
          >
            {t('inbox-title')}
          </chakra.h1>
          <chakra.p
            mb={5}
            color="gray.500"
            fontSize={{
              md: 'lg',
            }}
          >
            {t('inbox-description')}
          </chakra.p>
          <HStack>
            <Button
              as="a"
              w={{
                base: 'full',
                sm: 'auto',
              }}
              variant="solid"
              colorScheme="purple"
              size="lg"
              mb={{
                base: 2,
                sm: 0,
              }}
              cursor="pointer"
            >
              {t('inbox-action-one')}
            </Button>
            <Button
              as="a"
              w={{
                base: 'full',
                sm: 'auto',
              }}
              mb={{
                base: 2,
                sm: 0,
              }}
              size="lg"
              cursor="pointer"
            >
              {t('inbox-action-two')}
            </Button>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default NewPage;

export const getStaticProps = getStaticLocaleProps;
