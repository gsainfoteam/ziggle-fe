import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import { Close, Download } from "src/assets/Icons";
import Flex from "src/atoms/containers/flex/Flex";
import Image from "src/atoms/image/Image";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

import LongArrowSvg from "./assets/LongArrowSvg";

interface FullPageImageViewerProps {
  srcs: string[];
  startIndex?: number;
  onClose?: () => void;
}

const FullPageWrapper = styled(Flex)`
  z-index: 100;
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.6);
`;

const ImageNavigation = styled(Flex)`
  background-color: ${colorSet.text};
  padding: 5px;
`;

const MenuSum = styled(Flex)`
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Menu = styled(Flex)`
  cursor: pointer;
`;

const FullPageImageViewer = ({
  srcs,
  startIndex,
  onClose,
}: FullPageImageViewerProps) => {
  const [imageIndex, setImageIndex] = useState<number>(startIndex ?? 0);
  const maxIndex = srcs.length - 1;
  const isMobile = useIsMobile();

  const ManipulateIndex = (amount: number) => {
    setImageIndex((imageIndex) =>
      Math.max(0, Math.min(imageIndex + amount, maxIndex)),
    );
  };

  // 키보드 화살표로 인덱싱 지원
  useHotkeys([
    ["ArrowLeft", () => ManipulateIndex(-1)],
    ["ArrowRight", () => ManipulateIndex(1)],
    ["escape", () => onClose?.()],
  ]);

  const handleClose = () => {
    onClose?.();
  };

  // 이미지 다운로드
  const downloadImage = (imagePath: string): void => {
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = imagePath.split("/").pop() || ""; // 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    srcs.forEach((path) => downloadImage(path));
  };

  return (
    <FullPageWrapper
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <MenuSum gap="30px">
        <Menu alignItems="center" gap="10px" onClick={handleDownload}>
          <Text
            font={Font.Medium}
            color={colorSet.colorless}
            size={isMobile ? "0.875rem" : "1rem"}
          >
            전체 다운로드하기
          </Text>
          <Download size={isMobile ? "24px" : "32px"} />
        </Menu>
        <Menu alignItems="center" gap="10px" onClick={handleClose}>
          <Text
            font={Font.Medium}
            color={colorSet.colorless}
            size={isMobile ? "0.875rem" : "1rem"}
          >
            닫기
          </Text>
          <Close size={isMobile ? "16px" : "22px"} />
        </Menu>
      </MenuSum>
      <Flex gap={isMobile ? "20px" : "50px"} alignItems="center">
        <LongArrowSvg
          width={isMobile ? "20px" : "62px"}
          deselected={imageIndex <= 0}
          onClick={() => {
            ManipulateIndex(-1);
          }}
        />
        <Image
          src={srcs[imageIndex]}
          maxHeight="75vh"
          maxWidth="70vw"
          style={{
            flex: "1 1 auto",
          }}
        />
        <LongArrowSvg
          width={isMobile ? "20px" : "62px"}
          right
          deselected={imageIndex >= maxIndex}
          onClick={() => {
            ManipulateIndex(1);
          }}
        />
      </Flex>
      <Spacer height="10px" />
      <ImageNavigation gap="5px">
        {srcs.map((src, index) => (
          <Image
            width="50px"
            key={index}
            src={src}
            style={{
              cursor: "pointer",
              boxSizing: "border-box",
              border:
                imageIndex === index
                  ? `2px solid ${colorSet.primary}`
                  : undefined,
            }}
            onClick={() => {
              setImageIndex(index);
            }}
          />
        ))}
      </ImageNavigation>
    </FullPageWrapper>
  );
};

export default FullPageImageViewer;
