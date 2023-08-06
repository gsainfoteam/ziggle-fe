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

const icons = {
  [HorizontalDirection.LEFT]: {
    primary: Icon.ArrowCircleLeftPrimaryFilled,
    deselected: Icon.ArrowCircleLeftDeselectedFilled,
  },
  [HorizontalDirection.RIGHT]: {
    primary: Icon.ArrowCircleRightPrimaryFilled,
    deselected: Icon.ArrowCircleRightDeselectedFilled,
  },
};
const FilledArrowBtn = ({
  isPrimary,
  direction,
  width,
  height,
  onClick,
}: FilledArrowBtnProps) => {
  const Icon = isPrimary
    ? icons[direction].primary
    : icons[direction].deselected;
  return (
    <AnimatedBtn onClick={onClick}>
      <Icon width={width} height={height} />
    </AnimatedBtn>
  );
};

export default FilledArrowBtn;
