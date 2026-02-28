import { ResultImageZabo } from './result-image-zabo';
import { ResultTextZabo } from './result-text-zabo';

import type { ResultZaboProps } from './type';

const ResultZabo = (props: ResultZaboProps) => {
  const imageExists = props.imageUrls.length > 0;
  return imageExists ? (
    <ResultImageZabo {...props} />
  ) : (
    <ResultTextZabo {...props} />
  );
};

export default ResultZabo;
