/* eslint-disable no-console, no-plusplus, prefer-destructuring, import/no-extraneous-dependencies */
const fs = require('fs');
const chalk = require('chalk');

const DEFAULT_NAMESPACE = 'common';

module.exports = {
  input: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  output: './',
  options: {
    sort: true,
    lngs: ['en'],
    defaultLng: 'en',
    defaultKey: (_lng, ns, key) => key,
    defaultValue: (_lng, _ns, key) => key,
    resource: {
      loadPath: 'public/i18n/__lng__.json',
      savePath: 'public/i18n/__lng__.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    interpolation: {
      prefix: '__',
      suffix: '__',
    },
  },
  transform: function customTransform(file, enc, done) {
    const { parser } = this;
    const content = fs.readFileSync(file.path, enc);

    let ns;
    const match = content.match(/useTranslation\(.+\)/);
    if (match) ns = match[0].split(/('|")/)[2];

    let count = 0;
    parser.parseFuncFromString(
      content,
      { list: ['t'] },
      function (key, options) {
        parser.set(key, {
          ...options,
          ns: ns || DEFAULT_NAMESPACE,
          nsSeparator: ':',
          keySeparator: false,
        });
        ++count;
      },
    );
    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
