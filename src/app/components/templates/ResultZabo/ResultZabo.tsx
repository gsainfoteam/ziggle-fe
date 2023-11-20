'use client';

import { Notice } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';

import ResultImageZabo from './ResultImageZabo';
import ResultTextZabo from './ResultTextZabo';

export type ResultZaboProps = PropsWithLng<
  Notice & {
    searchQuery: string;
    logName?: string;
  }
>;

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
