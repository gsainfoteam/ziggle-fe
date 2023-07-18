import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import styled from "styled-components";

import Button, { ButtonVariant } from "../../atoms/button/Button";
import Area from "../../atoms/containers/area/Area";
import Content from "../../atoms/containers/content/Content";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";
import Checkbox from "../../atoms/inputs/checkbox/Checkbox";
import Input from "../../atoms/inputs/input/Input";
import Spacer from "../../atoms/spacer/Spacer";
import Text from "../../atoms/text/Text";
import NoticeTypeRadio from "../../molecules/noticeTypeRadio/NoticeTypeRadio";
import Tag from "../../molecules/tag/Tag";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";
import { NoticeType } from "../../types/types";
import dateFormat from "../../utils/dateFormat";
import NoticeWritingImageInput from "./NoticeWritingImageInput";

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
`;

const NoticeWriting = () => {
  const [noticeType, setNoticeType] = useState<NoticeType>(NoticeType.RECRUIT);
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(dateFormat(new Date(), "-"));

  const [tags, setTags] = useState<string[]>([]);

  const [files, setFiles] = useState<string[]>([]);

  return (
    <Area>
      <Content>
        <Spacer height={"100px"} />

        <Input placeholder={"제목을 입력하세요"} fontSize={"3rem"} />

        <Spacer height={"15px"} />

        <Flex alignItems={"center"} gap={"10px"}>
          <Checkbox
            label={"마감일 설정"}
            checked={hasDeadline}
            onChange={(event) => {
              setHasDeadline(event.target.checked);
            }}
          />

          {hasDeadline && deadline && (
            <DateInput
              type={"date"}
              value={deadline}
              onChange={(event) => {
                setDeadline(event.target.value);
              }}
            />
          )}
        </Flex>

        <Spacer height={"15px"} />

        <Flex flexDirection={"column"} gap={"15px"}>
          <Flex alignItems={"center"} gap={"12px"}>
            <Icon.LinesBlack width={"24px"} />
            <Text font={Font.Medium} size={"1.25rem"}>
              분류
            </Text>
          </Flex>

          <NoticeTypeRadio
            selected={noticeType}
            onChange={(noticeType: NoticeType) => setNoticeType(noticeType)}
          />
        </Flex>

        <Spacer height={"35px"} />

        <Flex flexDirection={"column"} gap={"15px"}>
          <Flex gap={"12px"}>
            <Icon.TagBlack width={"24px"} />
            <Text font={Font.Medium} size={"1.25rem"}>
              태그 설정
            </Text>
          </Flex>

          <Flex
            gap={"5px"}
            style={{
              border: `1.5px solid ${colorSet.primary}`,
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                onDeleteClick={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
              />
            ))}
            <Input
              placeholder={
                tags.length === 0 ? "태그를 입력하세요 (띄어쓰기로 구분)" : ""
              }
              onChange={(event) => {
                const tag = event.target.value;
                if (tag.includes(" ")) {
                  setTags([...tags, ...tag.split(" ").filter((t) => t !== "")]);
                  event.target.value = "";
                }
              }}
              style={{
                flexGrow: 1,
              }}
            />
          </Flex>
        </Flex>

        <Spacer height={"25px"} />

        <Flex flexDirection={"column"} gap={"15px"}>
          <Flex gap={"12px"}>
            <Icon.DocumentBlack width={"24px"} />
            <Text font={Font.Medium} size={"1.25rem"}>
              본문 내용 입력
            </Text>
          </Flex>

          <Editor />
        </Flex>

        <Spacer height={"60px"} />

        <NoticeWritingImageInput files={files} setFiles={setFiles} />

        <Spacer height={"100px"} />

        <Flex flexDirection={"column"} gap={"15px"} alignItems={"center"}>
          <Button variant={ButtonVariant.contained}>
            <Text
              size={"1.125rem"}
              font={Font.Bold}
              style={{
                padding: "5px 30px",
              }}
            >
              공지 제출하기
            </Text>
          </Button>
          <Text
            font={Font.Regular}
            color={colorSet.secondaryText}
            size={"0.875rem"}
          >
            공지 제출 시 수정이 불가능합니다.
          </Text>
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default NoticeWriting;
