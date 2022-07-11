import fs from 'fs/promises';
import path from 'path';

import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

export type TolgeeLocaleProps = {
  _tolgeeLocales: Record<string, Record<string, string>>;
};

export const getStaticLocaleProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<TolgeeLocaleProps>> => {
  const { locale } = context;

  if (!locale) return { notFound: true };

  const localeFile = await fs.readFile(
    path.join(process.cwd(), 'public', 'i18n', `${locale}.json`),
  );

  return {
    props: {
      _tolgeeLocales: {
        [locale]: JSON.parse(localeFile.toString()),
      },
    },
  };
};
