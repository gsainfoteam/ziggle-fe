import "react-loading-skeleton/dist/skeleton.css";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ImageRendererProps } from "src/types/types";
import styled, { css } from "styled-components";

const OriginIMG = styled.img<{ isHover: boolean; isLoading: boolean }>`
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
  ${({ isHover }) => {
    if (isHover) {
      return css`
        transform: translateY(-5px);
        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
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
            isLoading={isLoading}
            onLoad={handleImageLoad}
          />
        </>
      );
  }
};

export default ImageRenderer;
