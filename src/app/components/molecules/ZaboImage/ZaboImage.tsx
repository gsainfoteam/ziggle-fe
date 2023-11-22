'use client';

import Image from 'next/image';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ZaboOrigin, ZaboSize } from '@/app/components/organisms/Zabo/Zabo';

interface ZaboImageProps
  extends Omit<React.ComponentProps<typeof Image>, ZaboOrigin> {
  src: string;
  alt: string;
  wrapperClassName?: string;
}

const ZaboImage = <Origin extends ZaboOrigin>({
  alt,
  wrapperClassName,
  width,
  height,
  ...props
}: ZaboImageProps & ZaboSize<Origin>) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };
  const origin = width ? 'width' : 'height';
  const antiOrigin = width ? 'height' : 'width';
  const originSize = (origin === 'width' ? width : height) ?? 0;
  const antiOriginSize = imageSize
    ? (imageSize[antiOrigin] / imageSize[origin]) * (originSize ?? 0)
    : 0;

  return (
    <div
      className={[
        ...(wrapperClassName ? [wrapperClassName] : []),
        'relative',
      ].join(' ')}
      style={
        imageSize && imageSize.width && imageSize.height
          ? {
              [origin]: originSize,
              [antiOrigin]: antiOriginSize,
              [antiOrigin === 'width' ? 'minWidth' : 'minHeight']:
                origin === 'height' ? originSize / 1.5 : originSize,
              [antiOrigin === 'width' ? 'maxWidth' : 'maxHeight']:
                originSize * 2,
            }
          : { width: originSize, height: originSize }
      }
    >
      <Image
        alt={alt}
        {...props}
        className={[
          ...(props.className ? [props.className] : []),
          'object-left-top',
        ].join(' ')}
        sizes="25vw"
        fill
        onLoad={handleImageLoad}
      />
      {!imageSize && <Skeleton className="absolute h-full w-full" />}
    </div>
  );
};

export default ZaboImage;
