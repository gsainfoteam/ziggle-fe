'use server';

import 'server-only';

import { Notice } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';

import ResultImageZabo from './ResultImageZabo';
import ResultTextZabo from './ResultTextZabo';

export type ResultZaboProps = PropsWithLng<
  Notice & {
    searchQuery?: string;
    logName?: string;
  }
>;

const ResultZabo = (props: ResultZaboProps) => {
  const imageExists = props.imageUrls.length > 0;
  return imageExists ? (
    <ResultImageZabo {...(props as ResultZaboProps)} />
  ) : (
    <ResultTextZabo {...(props as ResultZaboProps)} />
  );
};

export default ResultZabo;
