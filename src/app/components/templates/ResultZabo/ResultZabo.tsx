import { Notice } from '@/api/notice/notice';
import { T } from '@/app/i18next';

import ResultImageZabo from './ResultImageZabo';
import ResultTextZabo from './ResultTextZabo';

export type ResultZaboProps = Notice & {
  searchQuery: string;
  logName?: string;
  t: T;
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
