export type ZaboOrigin = 'width' | 'height';

export type ZaboSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
  ? { height: number; width?: never }
  : never;

const Zabo = () => null;

export default Zabo;
