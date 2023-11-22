import { Content } from '@/api/notice/notice';

const getLocaleContents = (contents: Content[], language: string) => {
  const localeContents = contents.filter(
    (content) => content.lang === language,
  );

  return localeContents.length > 0 ? localeContents : contents;
};

export default getLocaleContents;
