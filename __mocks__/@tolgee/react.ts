// eslint-disable-next-line import/prefer-default-export
export const useTranslate = jest
  .fn()
  .mockImplementation(
    () => (input: { key: string } | string) =>
      typeof input === 'string' ? input : input.key,
  );
