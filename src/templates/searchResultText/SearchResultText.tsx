import Flex from "src/atoms/containers/flex/Flex";
import Chip, { ChipVariant } from "src/molecules/chip/Chip";
import defaults from "src/styles/defaults";
import { SearchResultProps } from "src/types/types";
import getDayOfWeek from "src/utils/getDay";
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
  deadline,
  title,
  author,
  tags,
  date,
  viewCount,
  searchQuery,
  organization,
  content,
}: SearchResultProps) => {
  return (
    <div
      style={{
        padding: `0 ${defaults.pageSideGap}`,
        boxSizing: "border-box",
        width: "100vw",
      }}
    >
      <ZaboWrapper>
        <Flex flexDirection="column">
          <Text font={Font.Medium} size="1.2rem">
            {deadline && `마감일 ${deadline} (${getDayOfWeek(deadline)})`}
          </Text>
          <GetHighlightedText
            text={title}
            query={searchQuery}
            font={Font.Bold}
            size="2rem"
            highlightColor={colorSet.primary}
          />
          <Flex gap="0.5rem" alignItems="center">
            <GetHighlightedText
              text={author}
              query={searchQuery}
              font={Font.Bold}
              size="1.2rem"
              highlightColor={colorSet.primary}
            />
            {organization && (
              <>
                <Text color={colorSet.secondaryText}>•</Text>
                <GetHighlightedText
                  text={organization}
                  query={searchQuery}
                  font={Font.Bold}
                  size="1.2rem"
                  highlightColor={colorSet.primary}
                />
              </>
            )}
          </Flex>

          <Flex gap="0.5rem" style={{ margin: "0.5rem 0" }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={"#" + tag}
                font={Font.Regular}
                variant={
                  tag === searchQuery ? ChipVariant.contained : undefined
                }
              />
            ))}
          </Flex>
          <Text
            font={Font.Medium}
            size="1.125rem"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3, // 이렇게밖에 안됨
              WebkitBoxOrient: "vertical",
            }}
          >
            {content}
          </Text>
        </Flex>

        <Flex flexDirection="column">
          <Flex gap="0.25em">
            <Text font={Font.Medium} color={colorSet.secondaryText}>
              {date}
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
    </div>
  );
};

export default SearchResultText;
