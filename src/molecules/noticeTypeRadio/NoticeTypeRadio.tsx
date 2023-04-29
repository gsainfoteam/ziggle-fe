import React from "react";

import Button from "../../atoms/button/Button";
import Flex from "../../atoms/containers/flex/Flex";
import { NoticeType } from "../../types/types";
import Chip, { ChipVariant } from "../chip/Chip";

interface NoticeTypeRadioProps {
  selected: NoticeType;
  onChange: (type: NoticeType) => void;
}

const NoticeTypeRadio = ({ selected, onChange }: NoticeTypeRadioProps) => {
  return (
    <Flex gap={"12px"}>
      <Button onClick={() => onChange(NoticeType.RECRUIT)}>
        <Chip
          label={"🎯 모집"}
          variant={
            selected === NoticeType.RECRUIT
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
      <Button onClick={() => onChange(NoticeType.EVENT)}>
        <Chip
          label={"🎈 행사"}
          variant={
            selected === NoticeType.EVENT
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
      <Button onClick={() => onChange(NoticeType.NORMAL)}>
        <Chip
          label={"🔔 일반"}
          variant={
            selected === NoticeType.NORMAL
              ? ChipVariant.contained
              : ChipVariant.outlined
          }
        />
      </Button>
    </Flex>
  );
};

export default NoticeTypeRadio;
