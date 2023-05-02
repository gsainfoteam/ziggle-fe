import React from "react";
import styled from "styled-components";

export interface GridProps {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  placeItems?: React.CSSProperties["placeItems"];
  gap?: string;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || "1fr"};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows || "1fr"};
  justify-content: ${({ justifyContent }) => justifyContent || "normal"};
  align-items: ${({ alignItems }) => alignItems || "normal"};
  place-items: ${({ placeItems }) => placeItems || "normal"};
  gap: ${({ gap }) => gap || null};

  ::-webkit-scrollbar {
    color: transparent;
  }
`;

export default Grid;
