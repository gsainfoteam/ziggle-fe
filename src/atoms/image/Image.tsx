import React from "react";
import styled, { css } from "styled-components";

export interface ImageProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  maxWidth?: React.CSSProperties["maxWidth"];
  maxHeight?: React.CSSProperties["maxHeight"];

  /** blur용으로 사용될 예정 */
  filter?: React.CSSProperties["filter"];
  objectPosition?: React.CSSProperties["objectPosition"];
  isLoading?: boolean;
  borderRadius?: React.CSSProperties["borderRadius"];
}

const Image = styled.img<ImageProps>`
  width: ${({ width }) => (width ? width : undefined)};
  height: ${({ height }) => (height ? height : undefined)};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : undefined)};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : undefined)};

  filter: ${({ filter }) => (filter ? filter : undefined)};
  object-position: ${({ objectPosition }) =>
    objectPosition ? objectPosition : undefined};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : undefined};
  object-fit: cover;
  ${({ isLoading }) => {
    // isLoading을 할당하지 않을 시 무조건 표시됨
    if (isLoading) {
      return css`
        display: none;
      `;
    }
  }}
`;

export default Image;
