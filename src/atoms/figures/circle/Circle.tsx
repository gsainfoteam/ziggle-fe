import React from "react";
import styled from "styled-components";

interface CircleProps {
  diameter: React.CSSProperties["width"];
  background?: React.CSSProperties["background"];
}

const Circle = styled.div<CircleProps>`
  width: ${({ diameter }) => (diameter ? diameter : "auto")};
  min-width: ${({ diameter }) => (diameter ? diameter : "auto")};

  aspect-ratio: 1 / 1;
  height: ${({ diameter }) => (diameter ? diameter : "auto")};
  min-height: ${({ diameter }) => (diameter ? diameter : "auto")};
  border-radius: 50%;
  background: ${({ background }) => (background ? background : undefined)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Circle;
