import React from "react";
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
  font-family: NotoSansKR-Medium, sans-serif;
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
    font-family: NotoSansKR-Medium, sans-serif;
  }
`;

export default Input;
