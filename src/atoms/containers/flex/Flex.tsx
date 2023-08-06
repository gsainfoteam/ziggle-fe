import React from "react";
import styled from "styled-components";

export interface Flex {
  flexDirection?: React.CSSProperties["flexDirection"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  gap?: React.CSSProperties["gap"];
  wrap?: React.CSSProperties["flexWrap"];

  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];

  flex?: React.CSSProperties["flex"];
}

const Flex = styled.div<Flex>`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  flex-wrap: wrap; // default
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "normal")};
  gap: ${({ gap }) => (gap ? gap : null)};

  ${({ wrap }) => (wrap ? `flex-wrap: ${wrap};` : null)}

  ${({ width }) => (width ? `width: ${width};` : null)}
  ${({ height }) => (height ? `height: ${height};` : null)}

  ${({ flex }) => (flex ? `flex: ${flex};` : null)}
`;

export default Flex;
