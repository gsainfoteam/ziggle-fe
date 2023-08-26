import React from "react";
import useIsMobile from "src/hooks/useIsMobile";
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
  const isMobile = useIsMobile();

  return (
    <AnimatedBtn onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleLeftDeselected
          width={isMobile ? "32px" : "36px"}
          height={isMobile ? "32px" : "36px"}
        />
      ) : (
        <Icon.ArrowCircleLeftPrimary
          width={isMobile ? "32px" : "32px"}
          height={isMobile ? "32px" : "36px"}
        />
      )}
    </AnimatedBtn>
  );
};

const Right = ({ disabled = false, onClick }: ButtonProps) => {
  const isMobile = useIsMobile();

  return (
    <AnimatedBtn onClick={onClick}>
      {disabled ? (
        <Icon.ArrowCircleRightDeselected
          width={isMobile ? "32px" : "36px"}
          height={isMobile ? "32px" : "36px"}
        />
      ) : (
        <Icon.ArrowCircleRightPrimary
          width={isMobile ? "32px" : "36px"}
          height={isMobile ? "32px" : "36px"}
        />
      )}
    </AnimatedBtn>
  );
};

HorizontalScrollButton.Left = Left;
HorizontalScrollButton.Right = Right;

export default HorizontalScrollButton;
