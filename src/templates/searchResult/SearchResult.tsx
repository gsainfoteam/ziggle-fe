import Flex from "src/atoms/containers/flex/Flex";
import ImageRenderer from "src/atoms/imageRenderer/ImageRenderer";
import defaults from "src/styles/defaults";
import styled from "styled-components";

interface SearchResultProps {
  deadline: string;
  title: string;
  author: string;
  tags: string[];
  date: string;
  thumbnailUrl: string;
  searchQuery: string;
}

const SearchResultWrap = styled(Flex)<{ padding: string }>`
  padding-left: ${({ padding }) => padding};
  padding-right: ${({ padding }) => padding};
  box-sizing: border-box;
`;

const SearchResult = ({
  deadline,
  title,
  author,
  tags,
  date,
  thumbnailUrl,
  searchQuery,
}: SearchResultProps) => {
  return (
    <SearchResultWrap
      width="100vw"
      alignItems="center"
      padding={defaults.pageSideGap}
    >
      <ImageRenderer />
    </SearchResultWrap>
  );
};

export default SearchResult;
