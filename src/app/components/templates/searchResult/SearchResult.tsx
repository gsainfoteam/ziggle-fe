import SearchResultImage from '../searchResultImage/SearchResultImage';
import SearchResultText from '../searchResultText/SearchResultText';

export interface Tag {
  id: number;
  name: string;
}

export interface SearchResultProps {
  id: number;
  deadline?: string;
  content?: string;
  title: string;
  author: string;
  organization?: string;
  tags: Tag[];
  date: string;
  viewCount: number;
  thumbnailUrl: string;
  searchQuery: string;
  logName?: string;
}

const SearchResult = (props: SearchResultProps) => {
  return props.thumbnailUrl ? (
    <SearchResultImage {...props} />
  ) : (
    <SearchResultText {...props} />
  );
};

export default SearchResult;
