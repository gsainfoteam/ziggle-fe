import styled from "styled-components";

import Button from "../button/Button";
import Icon from "../icon/Icon";

interface FilledArrowBtnProps {
  isPrimary: boolean;
  direction: HorizontalDirection;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export enum HorizontalDirection {
  LEFT = "left",
  RIGHT = "right",
}

const AnimatedBtn = styled(Button)`
  transition: transform 0.1s ease-in-out;
  :active {
    transform: scale(0.9);
  }
`;

const FilledArrowBtn = ({
  isPrimary,
  direction,
  width,
  height,
  onClick,
}: FilledArrowBtnProps) => {
  switch (direction) {
    case HorizontalDirection.LEFT:
      if (isPrimary) {
        // Left Primary
        return (
          <AnimatedBtn onClick={onClick}>
            <Icon.ArrowCircleLeftPrimaryFilled width={width} height={height} />
          </AnimatedBtn>
        );
      }
      // Left Deselected
      return (
        <AnimatedBtn onClick={onClick}>
          <Icon.ArrowCircleLeftDeselectedFilled width={width} height={height} />
        </AnimatedBtn>
      );
    case HorizontalDirection.RIGHT:
      if (isPrimary) {
        // Right Primary
        return (
          <AnimatedBtn onClick={onClick}>
            <Icon.ArrowCircleRightPrimaryFilled width={width} height={height} />
          </AnimatedBtn>
        );
      }
      // Right Deselected
      return (
        <AnimatedBtn onClick={onClick}>
          <Icon.ArrowCircleRightDeselectedFilled
            width={width}
            height={height}
          />
        </AnimatedBtn>
      );
  }
};

export default FilledArrowBtn;
