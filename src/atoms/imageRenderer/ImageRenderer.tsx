import "react-loading-skeleton/dist/skeleton.css";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import colorSet from "src/styles/colorSet";
import { ImageRendererProps } from "src/types/types";
import styled, { css } from "styled-components";

const OriginIMG = styled.img<{
  isHover: boolean;
  isLoading: boolean;
  shadowColor: string;
}>`
  border-radius: 5px;
  object-fit: cover;
  transition: 0.1s;
  z-index: 1;
  ${({ isLoading }) => {
    if (isLoading) {
      return css`
        display: none;
      `;
    }
  }}
  ${({ isHover, shadowColor }) => {
    if (isHover) {
      return css`
        transform: translateY(-10px);
        box-shadow: ${shadowColor}40 0px 5px, ${shadowColor}30 0px 10px,
          ${shadowColor}20 0px 15px, ${shadowColor}10 0px 20px,
          ${shadowColor}05 0px 25px;
      `;
    }
  }}
`;

const HeightOriginIMG = styled(OriginIMG)<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `calc(${size}px / 1.5)`};
  max-width: ${({ size }) => `calc(2 * ${size}px)`};
  object-position: center;
`;

const WidthOriginIMG = styled(OriginIMG)<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  max-height: ${({ size }) => `calc(2 * ${size}px)`};
`;

const SkeletonRenderer = ({ size }: Pick<ImageRendererProps, "size">) => {
  return (
    <Skeleton
      style={{
        borderRadius: "5px",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

const ImageRenderer = ({
  imageUrl,
  origin,
  size,
  isHover,
}: ImageRendererProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  switch (origin) {
    case "height":
      return (
        <>
          {isLoading && <SkeletonRenderer size={size} />}
          <HeightOriginIMG
            src={imageUrl}
            size={size}
            isHover={isHover}
            shadowColor={colorSet.primary}
            isLoading={isLoading}
            onLoad={handleImageLoad}
          />
        </>
      );
    case "width":
      return (
        <>
          {isLoading && <SkeletonRenderer size={size} />}
          <WidthOriginIMG
            src={imageUrl}
            size={size}
            isHover={isHover}
            shadowColor={colorSet.primary}
            isLoading={isLoading}
            onLoad={handleImageLoad}
          />
        </>
      );
  }
};

export default ImageRenderer;
