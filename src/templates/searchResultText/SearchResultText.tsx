import { useNavigate } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Chip, { ChipVariant } from "src/molecules/chip/Chip";
import Paths from "src/types/paths";
import { SearchResultProps } from "src/types/types";
import formatISODate from "src/utils/formatISODate";
import getDayOfWeek from "src/utils/getDayOfWeek";
import GetHighlightedText from "src/utils/GetHighlightedText";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  margin-top: 1rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  border-radius: 5px;
  border: 1px solid ${colorSet.secondaryText};
  cursor: pointer;

  p {
    margin: 0;
  }
`;

const SearchResultText = ({
  id,
  deadline,
  title,
  author,
  tags,
  date,
  viewCount,
  searchQuery,
  organization,
  content,
  logName,
}: SearchResultProps) => {
  const navigate = useNavigate();

  const handleZaboClick = () => {
    navigate(Paths.noticeDetail + id);
    sendLog(LogEvents.SearchResultClick, {
      location: logName ?? "unknown",
      isText: true,
    });
  };

  return (
    <Button width={"100%"} onClick={handleZaboClick}>
      <ZaboWrapper>
        <Flex flexDirection="column" alignItems={"start"}>
          <Text font={Font.Medium} size="1.2rem">
            {deadline &&
              `마감일 ${formatISODate(deadline)} (${getDayOfWeek(deadline)})`}
          </Text>
          <GetHighlightedText
            text={title}
            query={searchQuery}
            font={Font.Bold}
            size="1.875rem"
            textAlign={"start"}
            highlightColor={colorSet.primary}
          />
          <Flex gap="0.5rem" alignItems="center">
            <GetHighlightedText
              text={author}
              query={searchQuery}
              font={Font.Bold}
              size="1.125rem"
              highlightColor={colorSet.primary}
            />
            {organization && (
              <>
                <Text color={colorSet.secondaryText}>•</Text>
                <GetHighlightedText
                  text={organization}
                  query={searchQuery}
                  font={Font.Bold}
                  size="1.125rem"
                  highlightColor={colorSet.primary}
                />
              </>
            )}
          </Flex>

          <Flex gap="0.5rem" style={{ margin: "0.5rem 0" }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={"#" + tag.name}
                font={Font.Regular}
                variant={
                  tag.name === searchQuery ? ChipVariant.contained : undefined
                }
              />
            ))}
          </Flex>
          <Text
            font={Font.Medium}
            size="1.125rem"
            textAlign={"start"}
            style={{
              textOverflow: "ellipsis",

              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3, // 이렇게밖에 안됨
              WebkitBoxOrient: "vertical",
            }}
          >
            {!content && "<내용없음>"}
            {content}
            {/* 여기 HTML 처리 해야할 거 같음 */}
          </Text>
        </Flex>

        <Flex flexDirection="column">
          <Flex gap="0.25em">
            <Text font={Font.Medium} color={colorSet.secondaryText}>
              {formatISODate(date)}
            </Text>
            <Text font={Font.Medium} color={colorSet.secondaryText}>
              •
            </Text>
            <Text font={Font.Bold} color={colorSet.secondaryText}>
              조회수 {viewCount}
            </Text>
          </Flex>
        </Flex>
      </ZaboWrapper>
    </Button>
  );
};

export default SearchResultText;
