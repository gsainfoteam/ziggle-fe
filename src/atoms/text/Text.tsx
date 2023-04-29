import React from "react";
import styled, { css } from "styled-components";

import Font from "../../styles/font";

interface TextProps {
  color: React.CSSProperties["color"];
  font: Font;
  size: React.CSSProperties["fontSize"];
  textAlign: React.CSSProperties["textAlign"];
}

// 폰트별 letter-spacing 도 추가해야할 수도

const Text = styled.p<TextProps>`
  ${({ font }) => {
    switch (font) {
      case Font.Title:
        return css`
          font-family: "NotoSansKR-Bold", sans-serif;
          font-weight: 700;
          font-size: 4.375rem;
        `;
      case Font.NoticeTitle:
        return css`
          font-family: "NotoSansKR-Bold", sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
        `;
      case Font.NoticeDes_Medium:
        return css`
          font-family: "NotoSansKR-Medium", sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
        `;
      case Font.NoticeDes_Bold:
        return css`
          font-family: "NotoSansKR-Bold", sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
        `;
      case Font.NoticeWriter:
        return css`
          font-family: "NotoSansKR-Bold", sans-serif;
          font-weight: 700;
          font-size: 1rem;
        `;
      case Font.AharoniTitle:
        return css`
          font-family: "Aharoni-Bold", sans-serif;
          font-weight: 700;
          font-size: 4.375rem;
        `;
    }
  }}
  size: ${({ size }) => size ?? undefined};
  text-align: ${({ textAlign }) => textAlign ?? "inherit"};
`;

export default Text;
