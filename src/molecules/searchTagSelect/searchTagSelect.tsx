//import React from 'react';
import useIsMobile from "src/hooks/useIsMobile";

import Button from "../../atoms/button/Button";
import Flex from "../../atoms/containers/flex/Flex";
import { NoticeType } from "../../types/types";
import Chip, { ChipVariant } from "../chip/Chip";

interface NoticeTypeCheckboxProps {
  selected: NoticeType[];
  onChange: (selected: NoticeType[]) => void;
}

const searchTagSelect = ({ selected, onChange }: NoticeTypeCheckboxProps) => {
  const isMobile = useIsMobile();

  const handleCheckboxChange = (type: NoticeType) => {
    const index = selected.indexOf(type);
    if (index === -1) {
      // Add the type to the selected array
      onChange([...selected, type]);
    } else {
      // Remove the type from the selected array
      const updatedSelected = [...selected];
      updatedSelected.splice(index, 1);
      onChange(updatedSelected);
    }
  };

  return (
    <Flex
      gap={isMobile ? "8px" : "12px"}
      justifyContent={isMobile ? "space-between" : "start"}
      style={{
        padding: "0 2px",
      }}
    >
      <Button onClick={() => handleCheckboxChange(NoticeType.RECRUIT)}>
        <Chip
          label={"🎯 모집"}
          variant={
            selected.includes(NoticeType.RECRUIT)
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.EVENT)}>
        <Chip
          label={"🎈 행사"}
          variant={
            selected.includes(NoticeType.EVENT)
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.NORMAL)}>
        <Chip
          label={"🔔 일반"}
          variant={
            selected.includes(NoticeType.NORMAL)
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.ACADEMIC)}>
        <Chip
          label={"📰 학사"}
          variant={
            selected.includes(NoticeType.ACADEMIC)
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
    </Flex>
  );
};

export default searchTagSelect;
