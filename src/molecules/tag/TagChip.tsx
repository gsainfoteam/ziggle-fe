import useIsMobile from "src/hooks/useIsMobile";
import { MOBILE_BREAKPOINT } from "src/types/types";
import styled from "styled-components";

import Button from "../../atoms/button/Button";
import Circle from "../../atoms/figures/circle/Circle";
import Icon from "../../atoms/icon/Icon";
import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  height: 29px;
  width: max-content;
  border-radius: 14.5px;

  background-color: ${colorSet.primary};

  padding: 0 4px 0 10px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 22px;
    border-radius: 11px;

    padding: 0 4px 0 6px;
  }
`;

interface TagProps {
  label: string;
  onDeleteClick?: () => void;
}

const Tag = ({ label, onDeleteClick }: TagProps) => {
  const isMobile = useIsMobile();

  return (
    <TagWrapper>
      <Text
        font={Font.Medium}
        color={colorSet.colorless}
        size={isMobile ? "0.75rem" : "1rem"}
      >
        #{label}
      </Text>
      <Button onClick={onDeleteClick}>
        <Circle
          background={"white"}
          diameter={isMobile ? "calc(20px / 1.3)" : "20px"}
        >
          <Icon.XPrimary
            width={isMobile ? "calc(8.17px / 1.3)" : "8.17px"}
            height={isMobile ? "calc(8.17px / 1.3)" : "8.17px"}
          />
        </Circle>
      </Button>
    </TagWrapper>
  );
};

export default Tag;
