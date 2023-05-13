import React from "react";
import colorSet from "src/styles/colorSet";
import styled, { css } from "styled-components";

import Font from "../../styles/font";

export interface TextProps {
  color?: React.CSSProperties["color"];
  font?: Font;
  size?: React.CSSProperties["fontSize"];
  textAlign?: React.CSSProperties["textAlign"];
}

// 폰트별 letter-spacing 도 추가해야할 수도

const Text = styled.p<TextProps>`
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
      case Font.Aharoni:
        return css`
          font-family: "Aharoni-Bold", sans-serif;
          font-weight: 700;
        `;
    }
  }}
  font-size: ${({ size }) => size ?? undefined};
  text-align: ${({ textAlign }) => textAlign ?? "inherit"};
  color: ${({ color }) => color ?? colorSet.text};
`;

export default Text;
