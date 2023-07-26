import searchGif from "./assets/Search.gif";

interface SearchGifProps {
  width: React.CSSProperties["width"];
}

const SearchGif = ({ width }: SearchGifProps) => {
  return (
    <>
      <img width={width} height={width} alt="searchAnimation" src={searchGif} />
    </>
  );
};

export default SearchGif;
