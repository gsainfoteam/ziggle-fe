import { useEffect, useRef } from "react";
import Grid from "src/atoms/containers/grid/Grid";
import useIsMobile from "src/hooks/useIsMobile";
import styled from "styled-components";

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
  files: File[];
  setFiles: (files: File[]) => void;
}

const NoticeWritingImageInput = ({
  files,
  setFiles,
}: NoticeWritingImageInputProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedfiles = Array.from(event.dataTransfer.files);

    setFiles([...files, ...droppedfiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
    event.target.value = "";
  };

  return (
    <Flex flexDirection={"column"} gap={isMobile ? "10px" : "15px"}>
      <Flex gap={isMobile ? "8px" : "12px"}>
        <Icon.AddImgBlack width={isMobile ? "18px" : "24px"} />
        <Text font={Font.Medium} size={isMobile ? "1rem" : "1.25rem"}>
          사진 첨부
        </Text>
      </Flex>
      <Text
        font={Font.Regular}
        color={colorSet.secondaryText}
        size={isMobile ? "0.8125rem" : "1rem"}
      >
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
            gap={isMobile ? "6px" : "12px"}
            style={{
              padding: isMobile ? "6px" : "10px",
            }}
          >
            {files.map((file, index) => (
              <ImagePreviewItem
                key={index}
                src={URL.createObjectURL(file)}
                onDelete={() => {
                  setFiles(files.filter((f) => f !== file));
                  URL.revokeObjectURL(URL.createObjectURL(file));
                }}
              />
            ))}
            <Button
              borderRadius={isMobile ? "6px" : "10px"}
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
            <Spacer height={isMobile ? "30px" : "80px"} />

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
                  width: isMobile ? "45px" : "90px",
                  height: isMobile ? "6px" : "12px",
                  backgroundColor: colorSet.secondaryText,
                  top: `calc(50% - ${isMobile ? 3 : 6}px)`,
                  left: `calc(50% - ${isMobile ? 22.5 : 45}px)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: isMobile ? "45px" : "90px",
                  height: isMobile ? "6px" : "12px",
                  backgroundColor: colorSet.secondaryText,
                  transform: "rotate(90deg)",
                  top: `calc(50% - ${isMobile ? 3 : 6}px)`,
                  left: `calc(50% - ${isMobile ? 22.5 : 45}px)`,
                }}
              />
            </Flex>

            <Spacer height={isMobile ? "0px" : "25px"} />

            <Text
              size={isMobile ? "1rem" : "1.5rem"}
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
              style={{
                padding: isMobile ? "8px 12px" : "12px 16px",
              }}
            >
              <Text size={isMobile ? "0.75rem" : "1rem"} font={Font.Bold}>
                또는 내 컴퓨터에서 선택
              </Text>
            </Button>

            <Spacer height={isMobile ? "30px" : "50px"} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default NoticeWritingImageInput;
