import Flex from "src/atoms/containers/flex/Flex";
import ImageRenderer from "src/atoms/imageRenderer/ImageRenderer";
import Text from "src/atoms/text/Text";
import Chip, { ChipVariant } from "src/molecules/chip/Chip";
import colorSet from "src/styles/colorSet";
import defaults from "src/styles/defaults";
import Font from "src/styles/font";
import getDayOfWeek from "src/utils/getDay";
import GetHighlightedText from "src/utils/GetHighlightedText";
import styled from "styled-components";

interface SearchResultProps {
  deadline?: string;
  title: string;
  author: string;
  tags: string[];
  date: string;
  viewCount: number;
  thumbnailUrl: string;
  searchQuery: string;
}

const SearchResultWrap = styled(Flex)<{ padding: string }>`
  padding-left: ${({ padding }) => padding};
  padding-right: ${({ padding }) => padding};
  box-sizing: border-box;
  align-items: stretch;
`;

const SearchResult = ({
  deadline,
  title,
  author,
  tags,
  date,
  viewCount,
  thumbnailUrl,
  searchQuery,
}: SearchResultProps) => {
  return (
    <SearchResultWrap
      width="100vw"
      alignItems="center"
      padding={defaults.pageSideGap}
      gap="1.2rem"
    >
      <ImageRenderer
        origin="width"
        size={230}
        imageUrl={thumbnailUrl}
        isHover={false}
      />
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        style={{
          boxSizing: "border-box",
          padding: "1rem 0",
        }}
      >
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
          <GetHighlightedText
            text={author}
            query={searchQuery}
            font={Font.Bold}
            size="1.2rem"
            highlightColor={colorSet.primary}
          />
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
        </Flex>
        <Flex gap="0.5rem" alignItems="center">
          <Text font={Font.Regular} size="1rem" color={colorSet.secondaryText}>
            {date}
          </Text>
          <Text color={colorSet.secondaryText}>•</Text>
          <Text font={Font.Bold} size="1rem" color={colorSet.secondaryText}>
            조회수 {viewCount}
          </Text>
        </Flex>
      </Flex>
    </SearchResultWrap>
  );
};

export default SearchResult;
