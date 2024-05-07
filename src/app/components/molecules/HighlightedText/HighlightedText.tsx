interface GetHighlightedTextProps {
  children: string;
  query: string;
}

const HighlightedText = ({ children, query }: GetHighlightedTextProps) => {
  if (!query || !children.toLowerCase().includes(query.toLowerCase())) {
    // 검색어가 없거나 텍스트에 일치하는 부분이 없는 경우 그대로 반환
    return <>{children}</>;
  }

  const regex = new RegExp(query, 'gi');
  const match = children.match(regex);

  if (!match) return <></>;

  const result = children.split(regex);

  return result.map((str, index) => (
    <span key={index}>
      <span>{str}</span>
      {index !== result.length - 1 && (
        <span className="bg-primary text-white">{match[index]}</span>
      )}
    </span>
  ));
};

export default HighlightedText;
