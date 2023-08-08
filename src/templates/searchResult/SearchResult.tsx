import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import Chip, { ChipVariant } from "src/molecules/chip/Chip";
import ZaboImage from "src/molecules/zaboImage/ZaboImage";
import colorSet from "src/styles/colorSet";
import defaults from "src/styles/defaults";
import Font from "src/styles/font";
import { SearchResultProps } from "src/types/types";
import formatISODate from "src/utils/formatISODate";
import getDayOfWeek from "src/utils/getDayOfWeek";
import GetHighlightedText from "src/utils/GetHighlightedText";
import styled from "styled-components";

const SearchResultWrap = styled(Flex)`
  padding: 0 ${defaults.pageSideGap};
  box-sizing: border-box;
  align-items: stretch;
  cursor: pointer;
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
  organization,
}: SearchResultProps) => {
  return (
    <SearchResultWrap width="100vw" alignItems="center" gap="1.2rem">
      <ZaboImage origin="width" size={230} src={thumbnailUrl} isHover={false} />
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
            {deadline &&
              `마감일 ${formatISODate(deadline)} (${getDayOfWeek(deadline)})`}
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
                  tag.name === searchQuery ? ChipVariant.contained : undefined
                }
              />
            ))}
          </Flex>
        </Flex>
        <Flex gap="0.5rem" alignItems="center">
          <Text font={Font.Regular} size="1rem" color={colorSet.secondaryText}>
            {formatISODate(date)}
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
