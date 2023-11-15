import { Notice } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import ImageZabo from './ImageZabo';
import TextZabo from './TextZabo';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
  ? { height: number; width?: never }
  : never;

export type ZaboProps<Origin extends ZaboOrigin> = Notice &
  ZaboSize<Origin> & { t: T };

export type ImageZaboProps<Origin extends ZaboOrigin> = ZaboProps<Origin> & {
  imageUrl: string;
};

export type TextZaboProps<Origin extends ZaboOrigin> = ZaboProps<Origin>;

const Zabo = <IsImage extends boolean>(
  props: IsImage extends true
    ? ImageZaboProps<ZaboOrigin>
    : TextZaboProps<ZaboOrigin>,
) =>
  'imageUrl' in props ? (
    <ImageZabo
      {...(props as ImageZaboProps<ZaboOrigin>)}
      imageUrl={props.imageUrl || ''}
    />
  ) : (
    <TextZabo {...(props as TextZaboProps<ZaboOrigin>)} />
  );

export default Zabo;
