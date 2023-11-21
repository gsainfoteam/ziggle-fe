'use server';

import 'server-only';

import { Notice } from '@/api/notice/notice';
import { PropsWithT, T } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

import ResultImageZabo from './ResultImageZabo';
import ResultTextZabo from './ResultTextZabo';

export type ResultZaboProps = PropsWithT<
  Notice & {
    searchQuery: string;
    lng: Locale;
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
