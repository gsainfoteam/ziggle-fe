import React from "react";
import styled from "styled-components";

import Button from "../../atoms/button/Button";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";

interface HorizontalScrollButtonProps {
  children?: React.ReactNode;
}

const AnimatedBtn = styled(Button)`
  transition: transform 0.1s ease-in-out;

  :active {
    transform: scale(0.9);
  }
`;

const HorizontalScrollButton = ({ children }: HorizontalScrollButtonProps) => {
  return <Flex gap={"12px"}>{children}</Flex>;
};

interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Left = ({ disabled = false, onClick }: ButtonProps) => {
  return (
    <AnimatedBtn onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleLeftDeselected width={"36px"} height={"36px"} />
      ) : (
        <Icon.ArrowCircleLeftPrimary width={"36px"} height={"36px"} />
      )}
    </AnimatedBtn>
  );
};

const Right = ({ disabled = false, onClick }: ButtonProps) => {
  return (
    <AnimatedBtn onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleRightDeselected width={"36px"} height={"36px"} />
      ) : (
        <Icon.ArrowCircleRightPrimary width={"36px"} height={"36px"} />
      )}
    </AnimatedBtn>
  );
};

HorizontalScrollButton.Left = Left;
HorizontalScrollButton.Right = Right;

export default HorizontalScrollButton;
