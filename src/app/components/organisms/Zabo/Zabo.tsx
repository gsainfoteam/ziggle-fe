import { Notice } from '@/api/notice/notice';
import { PropsWithLng, PropsWithT } from '@/app/i18next';

import ImageZabo from './ImageZabo';
import TextZabo from './TextZabo';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
    ? { height: number; width?: never }
    : never;

export type ZaboProps<Origin extends ZaboOrigin> = PropsWithT<
  Notice & ZaboSize<Origin>
>;

const Zabo = <IsImage extends boolean>(
  props: ZaboProps<ZaboOrigin> & PropsWithLng,
) =>
  props.imagesUrl.length > 0 ? (
    <ImageZabo
      {...(props as ZaboProps<ZaboOrigin> & PropsWithLng)}
      imagesUrl={props.imagesUrl}
    />
  ) : (
    <TextZabo {...(props as ZaboProps<ZaboOrigin> & PropsWithLng)} />
  );

export default Zabo;
