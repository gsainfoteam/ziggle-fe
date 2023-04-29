import React from "react";
import styled from "styled-components";

import colorSet from "../../styles/colorSet";

interface PlainInputProps {
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  padding?: React.CSSProperties["padding"];
  fontSize?: React.CSSProperties["fontSize"];
}

const PlainInput = styled.input<PlainInputProps>`
  height: ${({ height }) => (height ? height : undefined)};
  width: ${({ width }) => (width ? width : undefined)};
  padding: ${({ padding }) => (padding ? padding : "0.5rem")};
  font-family: NotoSansKR-Bold, sans-serif;
  font-weight: 500;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "0.875rem")};
  border: none;
  border-radius: 0;
  outline-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  ::placeholder {
    color: ${colorSet.placeholder}
    font-family: NotoSansKR-Bold, sans-serif;
    font-weight: 500;

  }
`;

const Input = ({ height, width, padding }: PlainInputProps) => {
  return <PlainInput width={width} height={height} padding={padding} />;
};

export default Input;
