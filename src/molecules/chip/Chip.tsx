import styled, { css } from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

export enum ChipVariant {
  outlined = "outlined",
  contained = "contained",
}

interface ChipWrapperProps {
  variant?: ChipVariant;
}

const ChipWrapper = styled.div<ChipWrapperProps>`
  display: flex;
  align-items: center;

  height: 37px;
  width: max-content;
  border: 1.5px solid ${colorSet.primary};
  border-radius: 10px;
  padding: 0 15px;

  ${({ variant }) => {
    switch (variant) {
      case ChipVariant.outlined:
        return css`
          background-color: transparent;
        `;
      case ChipVariant.contained:
        return css`
          background-color: ${colorSet.primary};
        `;
    }
  }}
`;

interface ChipProps extends ChipWrapperProps {
  label: string;
  font?: Font;
}

const Chip = ({
  variant = ChipVariant.outlined,
  label,
  font = Font.Medium,
}: ChipProps) => {
  return (
    <ChipWrapper variant={variant}>
      <Text
        font={font}
        size={"1.25rem"}
        color={variant === ChipVariant.outlined ? colorSet.primary : "#ffffff"}
      >
        {label}
      </Text>
    </ChipWrapper>
  );
};

export default Chip;
