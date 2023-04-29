import React from "react";
import styled, { css } from "styled-components";

import colorSet from "../../styles/colorSet";

enum ButtonVariant {
  outlined = "outlined",
  contained = "contained",
}

interface ButtonProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  border?: React.CSSProperties["border"];
  borderRadius?: React.CSSProperties["borderRadius"];
  disabled?: boolean;
  variant?: ButtonVariant;
}

const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : undefined)};
  height: ${({ height }) => (height ? height : undefined)};
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;

  ${({ variant }) => {
    switch (variant) {
      case ButtonVariant.outlined:
        return css`
          border: 1px solid ${colorSet.primary};
          border-radius: 5px;
          padding: 10px 20px;
        `;
      case ButtonVariant.contained:
        return css`
          background-color: ${colorSet.primary};
          border-radius: 5px;
          padding: 10px 20px;
        `;
    }
  }}
  ${({ border }) => css`
    border: ${border};
  `}
  :hover {
    cursor: pointer;
  }
`;

export default Button;
