import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import DDay from "src/molecules/d-day/DDay";
import ZaboImage from "src/molecules/zaboImage/ZaboImage";
import Paths from "src/types/paths";
import { ZaboProps } from "src/types/types";
import { calculateDDay } from "src/utils/date";
import formatISODate from "src/utils/formatISODate";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled(Button)`
  position: relative;

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
  /* -webkit-box-orient: vertical; */
  overflow: hidden;
  transition: 0.1s;
  text-align: left;
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

const ImageZabo = ({
  title,
  date,
  deadline,
  viewCount,
  author,
  thumbnailUrl,
  organization,
  origin,
  size,
  id,
  logName,
}: Omit<ZaboProps, "content"> & { thumbnailUrl: string }) => {
  const { hovered, ref } = useHover<HTMLButtonElement>(); // useHover가 HTMLDivElement만 받아서 부득이하게 ZaboWrapper와 Button 분리

  const navigate = useNavigate();

  const handleZaboClick = () => {
    navigate(Paths.noticeDetail + id);
    sendLog(LogEvents.NoticeClick, {
      location: logName ?? "unknown",
      isText: false,
    });
  };

  return (
    <ZaboWrapper onClick={handleZaboClick} ref={ref}>
      <ZaboImage
        src={thumbnailUrl}
        origin={origin}
        size={size}
        isHover={hovered}
      />

      <Spacer height="3px" />

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
      <Text font={Font.Medium} textAlign="left">
        {author} {organization && `• ${organization}`}
      </Text>

      {deadline && calculateDDay(deadline) > 0 && (
        <Flex
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            zIndex: 1,
          }}
        >
          <DDay dayLeft={calculateDDay(deadline)} />
        </Flex>
      )}
    </ZaboWrapper>
  );
};

export default ImageZabo;
