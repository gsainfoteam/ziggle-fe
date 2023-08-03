import { useElementSize, useHover, useViewportSize } from "@mantine/hooks";
import { prominent } from "color.js";
import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Icon from "src/atoms/icon/Icon";
import Image from "src/atoms/image/Image";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

interface ZaboShowcaseProps {
  src: string;
  onShow?: () => void;
}

const ZaboShowcaseImage = styled(Image)<{ left: number; isHover: boolean }>`
  position: absolute;
  z-index: 1;

  transition: 0.2s;

  top: ${({ isHover }) => (isHover ? "180px" : "200px")};
  left: ${({ left }) => left}px;

  border-radius: 10px;
  border: 4px solid ${colorSet.colorless};
  cursor: pointer;
`;

const ImageCTAButton = styled(Button)<{ left: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  z-index: 3;

  top: 400px;
`;

const ZaboShowcase = ({ src, onShow }: ZaboShowcaseProps) => {
  const [bannerColor, setBannerColor] = useState<string>(colorSet.primary);

  useEffect(() => {
    prominent(src, { amount: 1, format: "hex" }).then((color) => {
      setBannerColor(color as string);
    });
  });

  const obeserverWidth = useViewportSize().width;
  const showcaseWidth = obeserverWidth * 0.45;
  const showcaseLeft = (obeserverWidth - showcaseWidth) / 2;

  const ctaButtonObeserver = useElementSize();
  const ctaButtonRef = ctaButtonObeserver.ref;
  const ctaButtonWidth = ctaButtonObeserver.width;
  const ctaButtonLeft = (obeserverWidth - ctaButtonWidth) / 2;

  const { ref, hovered } = useHover();

  return (
    <>
      <div style={{ width: "100%" }}>
        {/* 공지 상세 페이지 color banner - 이 컴포넌트도 따로 만드는 게 나을지, 아니면 이대로 둘지 */}
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: bannerColor,
            zIndex: -1,
          }}
        ></div>
        <div ref={ref}>
          <ZaboShowcaseImage
            src={src}
            alt="자보 이미지"
            width={showcaseWidth}
            left={showcaseLeft}
            isHover={hovered}
            onClick={() => {
              onShow?.();
            }}
          />
        </div>
        <ImageCTAButton
          variant={ButtonVariant.contained}
          height={"40px"}
          left={ctaButtonLeft}
          ref={ctaButtonRef}
          onClick={() => {
            onShow?.();
          }}
        >
          <Flex gap={"16px"}>
            <Text size={"0.875rem"} font={Font.Medium}>
              포스터 클릭하여 자세히 보기
            </Text>
            <Icon.ArrowDownWhite width={"16px"} />
          </Flex>
        </ImageCTAButton>
      </div>
    </>
  );
};

export default ZaboShowcase;
