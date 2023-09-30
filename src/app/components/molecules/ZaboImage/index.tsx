'use client';

import Image from 'next/image';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export type ZaboOrigin = 'width' | 'height';

export type ZaboImageSize<Origin extends ZaboOrigin> = Origin extends 'width'
  ? { width: number; height?: never }
  : Origin extends 'height'
  ? { height: number; width?: never }
  : never;

interface ZaboImageProps
  extends Omit<React.ComponentProps<typeof Image>, ZaboOrigin> {
  // src: string;
  // alt: string;
  wrapperClassName?: string;
}

const ZaboImage = <Origin extends ZaboOrigin>({
  alt,
  wrapperClassName,
  width,
  height,
  ...props
}: ZaboImageProps & ZaboImageSize<Origin>) => {
  const size = width ?? height;
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();
  // const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) =>
  //   setImageSize({
  //     width: e.currentTarget.naturalWidth,
  //     height: e.currentTarget.naturalHeight,
  //   });
  const handleImageLoad = (img: HTMLImageElement) =>
    setImageSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

  return (
    <div
      className={[
        ...(wrapperClassName ? [wrapperClassName] : []),
        'relative',
      ].join(' ')}
      style={
        imageSize
          ? {
              [width ? 'width' : 'height']: size,
              [width ? 'height' : 'width']:
                (imageSize[width ? 'height' : 'width'] /
                  imageSize[width ? 'width' : 'height']) *
                size,
            }
          : { width: size, height: size }
      }
    >
      <Image alt={alt} {...props} fill onLoadingComplete={handleImageLoad} />
      {!imageSize && <Skeleton className="absolute w-full h-full" />}
    </div>
  );
};

export default ZaboImage;
