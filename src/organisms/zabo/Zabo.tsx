import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import ZaboImage from "src/molecules/zaboImage/ZaboImage";
import Paths from "src/types/paths";
import { ZaboProps } from "src/types/types";
import formatISODate from "src/utils/formatISODate";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled(Button)`
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
  id,
}: Omit<ZaboProps, "content"> & { thumbnailUrl: string }) => {
  const { hovered, ref } = useHover<HTMLButtonElement>(); // useHover가 HTMLDivElement만 받아서 부득이하게 ZaboWrapper와 Button 분리

  const navigate = useNavigate();

  const handleZaboClick = () => {
    navigate(Paths.noticeDetail + id);
  };

  return (
    <ZaboWrapper onClick={handleZaboClick} ref={ref}>
      <ZaboImage
        src={thumbnailUrl}
        origin={origin}
        size={size}
        isHover={hovered}
      />
      <Title hovered={hovered}>{title}</Title>
      <Flex gap="0.25em">
        <Text font={Font.Medium} color={colorSet.secondaryText} size={"0.9rem"}>
          {formatISODate(date)}
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
