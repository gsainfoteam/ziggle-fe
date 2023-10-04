import React, { useState } from "react";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import Button, { ButtonVariant } from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Checkbox from "src/atoms/inputs/checkbox/Checkbox";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { MOBILE_BREAKPOINT } from "src/types/types";
import styled from "styled-components";

import dateFormat from "../../utils/dateFormat";

const DateInput = styled.input`
  border: none;
  font-size: 1.125rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  color: ${colorSet.primary};
  outline: none;

  ::-webkit-calendar-picker-indicator {
    // TODO: primary color로 바꾸기
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 0.875rem;
  }
`;

const AdditionalNotice = () => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(dateFormat(new Date(), "-"));

  return (
    <Button width={"70%"} variant={ButtonVariant.outlined}>
      <div style={{ justifyContent: "left", display: "flex" }}>
        <Text font={Font.Bold} size="1.2rem" color={colorSet.primary}>
          + 추가공지
        </Text>
      </div>
      <Flex alignItems={"center"}>
        <Checkbox
          label={"마감일 설정"}
          checked={hasDeadline}
          onChange={(event) => {
            setHasDeadline(event.target.checked);
            sendLog(LogEvents.NoticeWritingPageCheckDeadline, {
              checked: event.target.checked,
            });
          }}
        />

        {hasDeadline && deadline && (
          <DateInput
            type={"date"}
            value={deadline}
            onChange={(event) => {
              setDeadline(event.target.value);
              sendLog(LogEvents.NoticeWritingPageSetDeadline, {
                deadline: event.target.value,
              });
            }}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
            onClick={(event: React.MouseEvent<HTMLInputElement>) => {
              // @ts-ignore
              event.target.showPicker();
            }}
          />
        )}
      </Flex>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Checkbox />
        <Text font={Font.Medium} size="0.9rem" color={colorSet.text}>
          마감일 변경하기
        </Text>
        <Text font={Font.Medium} size="0.9rem" color={colorSet.primary}>
          2018.02.03.
        </Text>
        <Text font={Font.Medium} size="0.9rem" color={colorSet.text}>
          00:00:00
        </Text>
      </div>
      <div style={{ justifyContent: "left", display: "flex" }}>
        <Text font={Font.Regular} size="0.9rem" color={colorSet.placeholder}>
          여기에 추가 공지를 입력하세요
        </Text>
      </div>
      <Checkbox label="리마인드 설정한 사람들에게만 알림 보내기" />
      <Checkbox label="모든 사람들에게 알림 보내기" />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Button
          width={"133px"}
          color={colorSet.secondaryText}
          variant={ButtonVariant.contained}
        >
          <Text font={Font.Medium}>취소하기</Text>
        </Button>
        <Button
          width={"133px"}
          color={colorSet.primary}
          variant={ButtonVariant.contained}
        >
          <Text font={Font.Medium}>제출하기</Text>
        </Button>
      </div>
    </Button>
  );
};
export default AdditionalNotice;
