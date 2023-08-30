import { useNavigate } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import useIsMobile from "src/hooks/useIsMobile";
import DDay from "src/molecules/d-day/DDay";
import Paths from "src/types/paths";
import { MOBILE_BREAKPOINT, ZaboProps } from "src/types/types";
import { calculateDDay } from "src/utils/date";
import formatISODate from "src/utils/formatISODate";
import styled, { css } from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled(Button)<{
  height: number;
  width: number;
  shadowColor: string;
}>`
  position: relative;

  display: flex;
  flex: 0;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  margin-top: 1rem;

  height: ${(props) => props.height}px;
  min-width: ${(props) => props.width}px;
  box-sizing: border-box;
  overflow: hidden;

  background-color: ${colorSet.colorless};
  border-radius: 5px;
  border: 1px solid ${colorSet.secondaryText};
  cursor: pointer;

  line-height: 0;

  p {
    margin: 0;
  }

  transition: 0.1s;
  ${({ shadowColor }) => {
    return css`
      :hover {
        transform: translateY(-10px);
        box-shadow: ${shadowColor}40 0px 5px, ${shadowColor}30 0px 10px,
          ${shadowColor}20 0px 15px, ${shadowColor}10 0px 20px,
          ${shadowColor}05 0px 25px;
      }
    `;
  }}

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px;
  }
`;

const TextZabo = ({
  title,
  date,
  deadline,
  viewCount,
  author,
  content,
  organization,
  origin,
  size,
  id,
  logName,
}: ZaboProps) => {
  const [zaboHeight, zaboWidth] = [
    origin === "height" ? size : size * 1.5,
    origin === "height" ? size * 1.5 : size,
  ];

  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const handleZaboClick = () => {
    navigate(Paths.noticeDetail + id);
    sendLog(LogEvents.NoticeClick, {
      location: logName ?? "unknown",
      isText: true,
    });
  };

  // Line-clamp를 제목의 길이에 따라 처리
  const calculateLineClamp = (
    titleLength: number,
    origin: "width" | "height",
  ): number => {
    if (origin === "height") {
      return titleLength > 40 ? 2 : titleLength > 20 ? 3 : 5;
    } else if (origin === "width") {
      return titleLength > 40 ? 6 : titleLength > 20 ? 8 : 10;
    } else {
      throw new Error(`Invalid origin: ${origin}`);
    }
  };

  const titleLength = title.length;
  const lineClamp = calculateLineClamp(titleLength, origin);
  const dDay = deadline ? calculateDDay(deadline) : 0;

  return (
    <ZaboWrapper
      height={zaboHeight}
      width={zaboWidth}
      shadowColor={colorSet.primary}
      onClick={handleZaboClick}
    >
      <Flex flexDirection="column">
        <Text
          font={Font.Bold}
          size={isMobile ? "1rem" : "1.625rem"}
          style={{
            textAlign: "left",
            WebkitLineClamp: lineClamp,
          }}
        >
          {dDay >= 0 && <Spacer height={isMobile ? "1rem" : "1.5rem"} />}
          {/* title이 50이 넘을 일은 없지만 혹시 모르니 이렇게 처리 */}
          {titleLength > 50 ? title.slice(0, 50) + "..." : title}
        </Text>

        <Spacer height={"10px"} />

        <Text
          font={Font.Medium}
          size={isMobile ? "0.875rem" : "1.125rem"}
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: lineClamp,
            WebkitBoxOrient: "vertical",
            lineHeight: isMobile ? "1rem" : "1.5rem",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {content}
        </Text>
      </Flex>

      <Flex flexDirection="column">
        <Flex gap="0.25em">
          <Text
            font={Font.Medium}
            color={colorSet.secondaryText}
            size={isMobile ? "0.75rem" : "1rem"}
          >
            {formatISODate(date)}
          </Text>
          <Text
            font={Font.Medium}
            color={colorSet.secondaryText}
            size={isMobile ? "0.75rem" : "1rem"}
          >
            •
          </Text>
          <Text
            font={Font.Bold}
            color={colorSet.secondaryText}
            size={isMobile ? "0.75rem" : "1rem"}
          >
            조회수 {viewCount}
          </Text>
        </Flex>
        <Spacer height={"3px"} />
        <Text
          font={Font.Medium}
          textAlign="left"
          size={isMobile ? "0.75rem" : "1rem"}
        >
          {author} {organization && `• ${organization}`}
        </Text>
      </Flex>

      {dDay >= 0 && deadline && (
        <Flex
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            zIndex: 1,
          }}
        >
          <DDay deadline={deadline} />
        </Flex>
      )}
    </ZaboWrapper>
  );
};

export default TextZabo;
