import { Content } from '@/api/notice/notice';

const getLocaleContents = (contents: Content[], language: string) => {
  const localeContents = contents.filter(
    (content) => content.lang === language && content.id !== 1,
  );

  return localeContents.length > 0 ? localeContents : contents.slice(1);
};

export default getLocaleContents;
