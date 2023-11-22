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

export type ImageZaboProps<Origin extends ZaboOrigin> = ZaboProps<Origin> & {
  imageUrl: string;
};

export type TextZaboProps<Origin extends ZaboOrigin> = ZaboProps<Origin>;

const Zabo = <IsImage extends boolean>(
  props: IsImage extends true
    ? ImageZaboProps<ZaboOrigin> & PropsWithLng
    : TextZaboProps<ZaboOrigin> & PropsWithLng,
) =>
  'imageUrl' in props && props.imageUrl && props.imageUrl.length > 0 ? (
    <ImageZabo
      {...(props as ImageZaboProps<ZaboOrigin> & PropsWithLng)}
      imageUrl={props.imageUrl || ''}
    />
  ) : (
    <TextZabo {...(props as TextZaboProps<ZaboOrigin> & PropsWithLng)} />
  );

export default Zabo;
