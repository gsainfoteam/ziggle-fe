import { useRef } from "react";
import styled from "styled-components";

import Grid from "src/atoms/containers/grid/Grid";
import Button, { ButtonVariant } from "../../atoms/button/Button";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";
import Spacer from "../../atoms/spacer/Spacer";
import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";
import ImagePreviewItem from "./ImagePreviewItem";

const HiddenInput = styled.input`
  display: none;
`;

interface NoticeWritingImageInputProps {
  files: string[];
  setFiles: (files: string[]) => void;
}

const NoticeWritingImageInput = ({
  files,
  setFiles,
}: NoticeWritingImageInputProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedfiles = Array.from(event.dataTransfer.files);

    setFiles([
      ...files,
      ...droppedfiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([
      ...files,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
    event.target.value = "";
  };

  return (
    <Flex flexDirection={"column"} gap={"15px"}>
      <Flex gap={"12px"}>
        <Icon.AddImgBlack width={"24px"} />
        <Text font={Font.Medium} size={"1.25rem"}>
          사진 첨부
        </Text>
      </Flex>
      <Text font={Font.Regular} color={colorSet.secondaryText}>
        첨부된 사진 중 첫 번째 사진이 대표 사진으로 설정됩니다.
      </Text>

      <HiddenInput
        id={"file-input"}
        type={"file"}
        accept={"image/*"}
        multiple
        ref={hiddenFileInput}
        onChange={handleFileInputChange}
        style={{
          display: "none",
        }}
      />
      <label htmlFor={"file-input"}></label>

      <Flex
        alignItems="center"
        justifyContent="center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: `3px dashed ${colorSet.secondaryText}`,
          borderRadius: "5px",
        }}
      >
        {files.length > 0 ? (
          <Grid
            gridTemplateColumns="1fr 1fr 1fr"
            gap="12px"
            style={{
              padding: "10px",
            }}
          >
            {files.map((file, index) => (
              <ImagePreviewItem
                key={index}
                src={file}
                onDelete={() => {
                  setFiles(files.filter((f) => f !== file));
                }}
              />
            ))}
            <Button
              borderRadius={"10px"}
              style={{
                aspectRatio: "1/1",
                backgroundColor: colorSet.placeholder,
              }}
              onClick={() => {
                hiddenFileInput.current?.click();
              }}
            >
              <Icon.AddImgBlack width={"48px"} />
            </Button>
          </Grid>
        ) : (
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Spacer height={"80px"} />

            <Flex
              width={"100px"}
              height={"100px"}
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "90px",
                  height: "12px",
                  backgroundColor: colorSet.secondaryText,
                  top: "calc(50% - 6px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "90px",
                  height: "12px",
                  backgroundColor: colorSet.secondaryText,
                  transform: "rotate(90deg)",
                  top: "calc(50% - 6px)",
                }}
              />
            </Flex>

            <Spacer height={"25px"} />

            <Text
              size={"1.5rem"}
              font={Font.Bold}
              color={colorSet.secondaryText}
            >
              드래그해서 사진 추가
            </Text>

            <Spacer height={"15px"} />

            <Button
              variant={ButtonVariant.contained}
              onClick={() => {
                hiddenFileInput.current?.click();
              }}
            >
              <Text size={"1rem"} font={Font.Bold}>
                또는 내 컴퓨터에서 선택
              </Text>
            </Button>

            <Spacer height={"50px"} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default NoticeWritingImageInput;
