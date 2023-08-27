import React from "react";
import { MOBILE_BREAKPOINT } from "src/types/types";
import styled, { css } from "styled-components";

import colorSet from "../../styles/colorSet";

export enum ButtonVariant {
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
  animated?: boolean;
}

const Button = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : undefined)};
  height: ${({ height }) => (height ? height : undefined)};
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  transition: 0.1s;
  line-height: 0;

  ${({ variant }) => {
    if (variant) {
      return css`
        border-radius: 5px;
        padding: 10px 20px;

        @media (max-width: ${MOBILE_BREAKPOINT}) {
          padding: 3px 10px;
        }
      `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case ButtonVariant.outlined:
        return css`
          border: 1px solid ${colorSet.primary};
          color: ${colorSet.primary};

          :hover {
            background-color: ${colorSet.secondary};
          }
        `;
      case ButtonVariant.contained:
        return css`
          background-color: ${colorSet.primary};
          color: ${colorSet.colorless};

          :hover {
            box-shadow: inset rgba(0, 0, 0, 0.15) 0px 0px 0px 40px;
          }
        `;
    }
  }}
  ${({ border }) => css`
    border: ${border};
  `}
  ${({ borderRadius }) => css`
    border-radius: ${borderRadius};
  `}
  :hover {
    cursor: pointer;
  }

  ${({ animated }) =>
    animated &&
    css`
      &:active {
        transform: scale(0.95);
      }
    `}
`;

export default Button;
