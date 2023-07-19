import "react-loading-skeleton/dist/skeleton.css";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import colorSet from "src/styles/colorSet";
import { ImageRendererProps } from "src/types/types";
import styled, { css } from "styled-components";

const OriginIMG = styled.img<{
  isHover: boolean;
  isLoading: boolean;
  shadowColor: string;
  borderRadius: number;
}>`
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
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

const HeightOriginIMG = styled(OriginIMG)<{
  size: number;
  tGP: number;
  tMS: number;
  objectPosition: React.CSSProperties["objectPosition"];
}>`
  height: ${({ size }) => `${size}px`};
  min-width: ${({ size, tMS }) => `calc(${size}px / ${tMS})`};
  max-width: ${({ size, tGP }) => `calc(${tGP} * ${size}px)`};
  object-position: ${({ objectPosition }) => objectPosition};
`;

const WidthOriginIMG = styled(OriginIMG)<{ size: number; tGP: number }>`
  width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  max-height: ${({ size, tGP }) => `calc(${tGP} * ${size}px)`};
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
  objectPosition = "center",
  borderRadius = 5,
  tGP = 2,
  tMS = 1.5,
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
            objectPosition={objectPosition}
            borderRadius={borderRadius}
            tGP={tGP}
            tMS={tMS}
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
            borderRadius={borderRadius}
            onLoad={handleImageLoad}
            tGP={tGP}
          />
        </>
      );
  }
};

export default ImageRenderer;
