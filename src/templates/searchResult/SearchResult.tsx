import { SearchResultProps } from "src/types/types";

import SearchResultImage from "../searchResultImage/SearchResultImage";
import SearchResultText from "../searchResultText/SearchResultText";

const SearchResult = (props: SearchResultProps) => {
  return props.thumbnailUrl ? (
    <SearchResultImage {...props} />
  ) : (
    <SearchResultText {...props} />
  );
};

export default SearchResult;
