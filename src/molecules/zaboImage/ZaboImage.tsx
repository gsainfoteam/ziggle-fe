import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "src/atoms/image/Image";
import colorSet from "src/styles/colorSet";
import styled, { css } from "styled-components";

const HoverImage = styled(Image)<{ isHover: boolean; shadowColor: string }>`
  transition: 0.1s;
  z-index: 1;
  ${({ isHover, shadowColor }) => {
    if (isHover) {
      return css`
        transform: translateY(-10px);
        box-shadow: ${colorSet.primary}40 0px 5px, ${shadowColor}30 0px 10px,
          ${shadowColor}20 0px 15px, ${shadowColor}10 0px 20px,
          ${shadowColor}05 0px 25px;
      `;
    }
  }}
`;

const HeightOriginIMG = styled(HoverImage)<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `calc(${size}px / 1.5`};
  max-width: ${({ size }) => `calc(2 * ${size}px)`};
  object-position: "center";
`;

const WidthOriginIMG = styled(HoverImage)<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  max-height: ${({ size }) => `calc(2 * ${size}px)`};
`;

interface SkeletonRendererProps {
  width: number;
  height: number;
}

const SkeletonRenderer = ({ width, height }: SkeletonRendererProps) => {
  return (
    <Skeleton
      style={{
        borderRadius: "5px",
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    />
  );
};

type ZaboImageOrigin = "height" | "width";

export interface ZaboImageProps {
  src: string;
  origin: ZaboImageOrigin;
  size: number;
  isHover: boolean;
}

const ZaboImage = ({ src, origin, size, isHover }: ZaboImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  switch (origin) {
    case "height":
      return (
        <>
          {isLoading && <SkeletonRenderer width={size} height={size} />}
          <HeightOriginIMG
            src={src}
            size={size}
            isHover={isHover}
            shadowColor={colorSet.primary}
            isLoading={isLoading}
            onLoad={handleImageLoad}
            borderRadius="5px"
          />
        </>
      );
    case "width":
      return (
        <>
          {isLoading && <SkeletonRenderer width={size} height={size} />}
          <WidthOriginIMG
            src={src}
            size={size}
            isHover={isHover}
            shadowColor={colorSet.primary}
            isLoading={isLoading}
            borderRadius="5px"
            onLoad={handleImageLoad}
          />
        </>
      );
  }
};

export default ZaboImage;
