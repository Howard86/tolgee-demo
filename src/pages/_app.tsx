import { ChakraProvider } from '@chakra-ui/react';
import { TolgeeProvider } from '@tolgee/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@/app/redux/store';
import theme from '@/app/theme';
import { TolgeeLocaleProps } from '@/common/utils/static-props';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('../../mocks');
}

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <TolgeeProvider
          wrapperMode="invisible"
          forceLanguage={locale}
          apiKey={process.env.NEXT_PUBLIC_TOLGEE_API_KEY}
          apiUrl={process.env.NEXT_PUBLIC_TOLGEE_API_URL}
          staticData={{
            en: () => import('@/public/i18n/en.json'),
            ...(pageProps as TolgeeLocaleProps)._tolgeeLocales,
          }}
          enableLanguageDetection={false}
          loadingFallback={null}
        >
          <Component {...pageProps} />
        </TolgeeProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
