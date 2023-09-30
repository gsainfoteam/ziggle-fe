import ImageZabo from './ImageZabo';
import TextZabo from './TextZabo';

export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
  ? { height: number; width?: never }
  : never;

const Zabo = (
  props:
    | React.ComponentProps<typeof ImageZabo>
    | React.ComponentProps<typeof TextZabo>,
) =>
  'thumbnailUrl' in props ? <ImageZabo {...props} /> : <TextZabo {...props} />;

export default Zabo;
