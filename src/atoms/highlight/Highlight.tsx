import React from "react";
import styled, { css } from "styled-components";

import Font from "../../styles/font";

export interface HightlightProps {
  color?: React.CSSProperties["color"];
  font?: Font;
  size?: React.CSSProperties["fontSize"];
  textAlign?: React.CSSProperties["textAlign"];
}

// 폰트별 letter-spacing 도 추가해야할 수도

const Highlight = styled.span<HightlightProps>`
  margin: 0;
  ${({ font }) => {
    switch (font) {
      case Font.Bold:
        return css`
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 700;
        `;
      case Font.Medium:
        return css`
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 500;
        `;
      case Font.Regular:
        return css`
          font-family: "Noto Sans KR", sans-serif;
          font-weight: 400;
        `;
      default:
        return css`
          font-family: inherit;
          font-weight: inherit;
        `;
    }
  }}
  font-size: ${({ size }) => size ?? "inherit"};
  text-align: ${({ textAlign }) => textAlign ?? "inherit"};
  color: ${({ color }) => color ?? "inherit"};
`;

export default Highlight;
