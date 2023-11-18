'use client';

import { Notice } from '@/api/notice/notice';
import { Locale } from '@/app/i18next/settings';

import ResultImageZabo from './ResultImageZabo';
import ResultTextZabo from './ResultTextZabo';

export type ResultZaboProps = Notice & {
  searchQuery: string;
  logName?: string;
  lng: Locale;
};

export type ResultImageZaboProps = ResultZaboProps & {
  imageUrl: string;
};

export type ResultTextZaboProps = ResultZaboProps;

const ResultZabo = (props: ResultZaboProps) => {
  return props.imageUrl ? (
    <ResultImageZabo {...(props as ResultImageZaboProps)} />
  ) : (
    <ResultTextZabo {...(props as ResultTextZaboProps)} />
  );
};

export default ResultZabo;
