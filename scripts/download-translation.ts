/* eslint-disable no-console, no-plusplus, import/no-extraneous-dependencies */

import fs from 'fs/promises';
import path from 'path';

import { loadEnvConfig } from '@next/env';
import AdmZip from 'adm-zip';

import 'next';

const toBuffer = (ab: ArrayBuffer) => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};

const main = async () => {
  loadEnvConfig(process.cwd(), true);
  const localeDirPath = path.join(process.cwd(), 'public', 'i18n');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TOLGEE_API_URL}/api/project/export/jsonZip?ak=${process.env.NEXT_PUBLIC_TOLGEE_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const arrayBuffer = await response.arrayBuffer();

  const zip = new AdmZip(toBuffer(arrayBuffer));

  const zipEntries = zip.getEntries();

  await Promise.all(
    zipEntries.map((entry) =>
      fs.writeFile(path.join(localeDirPath, entry.name), zip.readAsText(entry)),
    ),
  );

  console.log(`Downloaded ${zipEntries.length} files`);
};

main().catch(console.error);
