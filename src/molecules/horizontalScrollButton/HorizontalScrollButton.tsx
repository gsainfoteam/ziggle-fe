import React from "react";

import Button from "../../atoms/button/Button";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";

interface HorizontalScrollButtonProps {
  children?: React.ReactNode;
}

const HorizontalScrollButton = ({ children }: HorizontalScrollButtonProps) => {
  return <Flex gap={"12px"}>{children}</Flex>;
};

interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Left = ({ disabled = false, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleLeftDeselected width={"40px"} height={"40px"} />
      ) : (
        <Icon.ArrowCircleLeftPrimary width={"40px"} height={"40px"} />
      )}
    </Button>
  );
};

const Right = ({ disabled = false, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleRightDeselected width={"40px"} height={"40px"} />
      ) : (
        <Icon.ArrowCircleRightPrimary width={"40px"} height={"40px"} />
      )}
    </Button>
  );
};

HorizontalScrollButton.Left = Left;
HorizontalScrollButton.Right = Right;

export default HorizontalScrollButton;
