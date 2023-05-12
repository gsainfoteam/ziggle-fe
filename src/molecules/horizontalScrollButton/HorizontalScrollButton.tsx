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
        <Icon.ArrowCircleLeftDeselected width={"40px"} height={"40px"} />
      ) : (
        <Icon.ArrowCircleLeftPrimary width={"40px"} height={"40px"} />
      )}
    </AnimatedBtn>
  );
};

const Right = ({ disabled = false, onClick }: ButtonProps) => {
  return (
    <AnimatedBtn onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleRightDeselected width={"40px"} height={"40px"} />
      ) : (
        <Icon.ArrowCircleRightPrimary width={"40px"} height={"40px"} />
      )}
    </AnimatedBtn>
  );
};

HorizontalScrollButton.Left = Left;
HorizontalScrollButton.Right = Right;

export default HorizontalScrollButton;
