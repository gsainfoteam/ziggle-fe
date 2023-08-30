import { useMutation } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "src/apis/image/image-api";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import { createNotice } from "src/apis/notice/notice-api";
import useAuth from "src/hooks/useAuth";
import useIsMobile from "src/hooks/useIsMobile";
import Paths from "src/types/paths";
import { isEmpty } from "src/utils/utils";
import styled from "styled-components";
import Swal from "sweetalert2";

import Area from "../../atoms/containers/area/Area";
import Content from "../../atoms/containers/content/Content";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";
import Checkbox from "../../atoms/inputs/checkbox/Checkbox";
import Input from "../../atoms/inputs/input/Input";
import Spacer from "../../atoms/spacer/Spacer";
import Text from "../../atoms/text/Text";
import NoticeTypeRadio from "../../molecules/noticeTypeRadio/NoticeTypeRadio";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";
import { MOBILE_BREAKPOINT, NoticeType, Tag } from "../../types/types";
import dateFormat from "../../utils/dateFormat";
import NoticeWritingActions from "./NoticeWritingActions";
import NoticeWritingImageInput from "./NoticeWritingImageInput";
import TagSelector from "./TagSelector";

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

const noticeTypeToTagId = (noticeType: NoticeType): number => {
  switch (noticeType) {
    case NoticeType.RECRUIT:
      return 1;
    case NoticeType.EVENT:
      return 2;
    case NoticeType.NORMAL:
      return 3;
    case NoticeType.ACADEMIC:
      return 4;
  }
};

const TagDescription = ({
  title,
  description,
  example,
}: {
  title: string;
  description: string;
  example?: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Text
        font={Font.Bold}
        size={isMobile ? "1rem" : "1.5rem"}
        color={colorSet.text}
      >
        {title}
      </Text>
      <Spacer height={isMobile ? "6px" : "10px"} />
      <Text
        font={Font.Regular}
        size={isMobile ? "0.875rem" : "1.125rem"}
        color={colorSet.text}
      >
        {description}
      </Text>
      <Spacer height={isMobile ? "6px" : "10px"} />
      <Text
        font={Font.Regular}
        size={isMobile ? "0.875rem" : "1.125rem"}
        color={colorSet.secondaryText}
      >
        {example}
      </Text>
    </>
  );
};

const NoticeWritingPage = () => {
  useAuth({ redirectUrl: Paths.home });

  const isMobile = useIsMobile();

  const [title, setTitle] = useState<string>("");
  const [noticeType, setNoticeType] = useState<NoticeType>(NoticeType.RECRUIT);
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(dateFormat(new Date(), "-"));

  const [tags, setTags] = useState<Tag[]>([]);

  const [images, setImages] = useState<File[]>([]);

  const editorRef = useRef<any>(null);

  const navigate = useNavigate();

  const handleNotice = useMutation(createNotice, {
    onSuccess: () => {
      navigate(Paths.home);
    },
  });
  const handleImage = useMutation(uploadImages, {
    onSuccess: (data) => {
      writeNotice(data);
    },
  });

  const handleSubmit = () => {
    sendLog(LogEvents.NoticeWritingPageClickSubmit);

    if (!title) {
      Swal.fire({
        text: "제목을 입력해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    if (title.length > 50) {
      Swal.fire({
        text: "제목을 50자 이하로 입력해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    if (!editorRef.current) {
      Swal.fire({
        text: "내용을 입력해주세요",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    if (isEmpty(images)) {
      writeNotice(null);
      return;
    }
    handleImage.mutate({
      images,
    });
  };

  const writeNotice = (imageKeys: string[] | null) => {
    const content = editorRef.current.getContent();

    handleNotice.mutate({
      title,
      body: content,
      deadline: hasDeadline ? new Date(deadline) : undefined,
      tags: [...tags.map((tag) => tag.id), noticeTypeToTagId(noticeType)],
      images: imageKeys ?? [],
    });
  };

  return (
    <Area>
      <Content>
        <Spacer height={"50px"} />

        <Input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder={"제목을 입력하세요"}
          fontSize={isMobile ? "1.375rem" : "3rem"}
          padding="0"
          onBlur={(event) =>
            sendLog(LogEvents.NoticeWritingPageTypeTitle, {
              title: event.target.value,
            })
          }
        />

        <Spacer height={"15px"} />

        <Flex alignItems={"center"} gap={isMobile ? "5px" : "10px"}>
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
            />
          )}
        </Flex>

        <Spacer height={"15px"} />

        <Flex flexDirection={"column"} gap={"15px"}>
          <Flex alignItems={"center"} gap={"12px"}>
            <Icon.LinesBlack width={isMobile ? "20px" : "24px"} />
            <Text font={Font.Medium} size={isMobile ? "0.875rem" : "1.25rem"}>
              분류
            </Text>
          </Flex>

          <NoticeTypeRadio
            selected={noticeType}
            onChange={(noticeType: NoticeType) => {
              setNoticeType(noticeType);
              sendLog(LogEvents.NoticeWritingPageSetType, {
                type: noticeType,
              });
            }}
          />
        </Flex>

        <Spacer height="30px" />

        {NoticeType.RECRUIT === noticeType && (
          <TagDescription
            title="🎯모집 공지를 선택하셨군요!"
            description="동아리, 그룹이나 행사에 사람들을 모집하고 싶으시다면, 모집 공지를
              작성해보세요."
            example="예시) 동아리 신규부원 모집, 학생회 모집, 무한도전 팀원 구인, 공모전, 대회"
          />
        )}

        {NoticeType.EVENT === noticeType && (
          <TagDescription
            title="🎈행사 공지를 선택하셨군요!"
            description="여러분이 진행하시는 행사를 행사 공지에서 마음껏 홍보하세요."
            example="예시) 축제, 전시회, 공연, 세미나, 강연, 워크숍"
          />
        )}

        {NoticeType.NORMAL === noticeType && (
          <TagDescription
            title="🔔일반 공지를 선택하셨군요!"
            description="모집이나 행사 공지에 해당되지 않는 공지들입니다."
            example="예시) 하우스 공지, 학생회 공지, 통보 등"
          />
        )}

        <Spacer height={"45px"} />

        <TagSelector tags={tags} setTags={setTags} />

        <Spacer height={"25px"} />

        <Flex flexDirection={"column"} gap={"15px"}>
          <Flex gap={isMobile ? "8px" : "12px"}>
            <Icon.DocumentBlack width={isMobile ? "18px" : "24px"} />
            <Text font={Font.Medium} size={isMobile ? "1rem" : "1.25rem"}>
              본문 내용 입력
            </Text>
          </Flex>

          <Editor
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            onInit={(_, editor) => (editorRef.current = editor)}
            init={{
              promotion: false,
            }}
            onBlur={(event) =>
              sendLog(LogEvents.NoticeWritingPageTypeContent, {
                content: event.target.getContent(),
              })
            }
          />
        </Flex>

        <Spacer height={"60px"} />

        <NoticeWritingImageInput files={images} setFiles={setImages} />

        <Spacer height={"100px"} />

        <NoticeWritingActions handleSubmit={handleSubmit} />
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default NoticeWritingPage;
