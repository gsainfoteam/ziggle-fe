import { useHover } from "@mantine/hooks";
import Flex from "src/atoms/containers/flex/Flex";
import ImageRenderer from "src/atoms/imageRenderer/ImageRenderer";
import { ZaboProps } from "src/types/types";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled.div`
  margin-top: 1rem;
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  p {
    margin: 0;
  }
`;

const Title = styled(Text)<{ hovered: boolean }>`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: 0.1s;
  ${({ hovered }) => {
    if (hovered) {
      return `
        color: ${colorSet.primary};
      `;
    }
  }}
`;
Title.defaultProps = {
  font: Font.Bold,
  size: "1.2rem",
};

const Zabo = ({
  title,
  date,
  viewCount,
  author,
  thumbnailUrl,
  organization,
  origin,
  size,
}: Omit<ZaboProps, "content"> & { thumbnailUrl: string }) => {
  const { hovered, ref } = useHover();
  return (
    <ZaboWrapper ref={ref}>
      <ImageRenderer
        imageUrl={thumbnailUrl}
        origin={origin}
        size={size}
        isHover={hovered}
      />
      <Title hovered={hovered}>{title}</Title>
      <Flex gap="0.25em">
        <Text font={Font.Medium} color={colorSet.secondaryText} size={"0.9rem"}>
          {date}
        </Text>
        <Text font={Font.Medium} color={colorSet.secondaryText} size={"0.9rem"}>
          •
        </Text>
        <Text font={Font.Bold} color={colorSet.secondaryText} size={"0.9rem"}>
          조회수 {viewCount}
        </Text>
      </Flex>
      <Text font={Font.Bold}>
        {author} {organization && `• ${organization}`}
      </Text>
    </ZaboWrapper>
  );
};

export default Zabo;
