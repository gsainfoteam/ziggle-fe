import React from "react";
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
`;

interface TagProps {
  label: string;
  onDeleteClick?: () => void;
}

const Tag = ({ label, onDeleteClick }: TagProps) => {
  return (
    <TagWrapper>
      <Text font={Font.NoticeDes_Medium} color={"white"}>
        #{label}
      </Text>
      <Button onClick={onDeleteClick}>
        <Circle background={"white"} diameter={"20px"}>
          <Icon.XPrimary width={"8.17px"} height={"8.17px"} />
        </Circle>
      </Button>
    </TagWrapper>
  );
};

export default Tag;
