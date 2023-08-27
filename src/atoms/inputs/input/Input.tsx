import React from "react";
import { MOBILE_BREAKPOINT } from "src/types/types";
import styled from "styled-components";

import colorSet from "../../../styles/colorSet";

interface InputProps {
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  padding?: React.CSSProperties["padding"];
  fontSize?: React.CSSProperties["fontSize"];
  color?: React.CSSProperties["color"];
}

const Input = styled.input<InputProps>`
  height: ${({ height }) => (height ? height : undefined)};
  width: ${({ width }) => (width ? width : undefined)};
  padding: ${({ padding }) => (padding ? padding : "0.5rem")};

  font-family: Noto Sans KR, sans-serif;
  font-weight: 700;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "0.875rem")};
  color: ${({ color }) => (color ? color : colorSet.text)};

  border: none;
  border-radius: 0;
  outline-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;

  ::placeholder {
    color: ${colorSet.placeholder};
    font-family: Noto Sans KR, sans-serif;
    font-weight: 700;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    ::placeholder {
      font-weight: 500;
    }
  }
`;

export default Input;
