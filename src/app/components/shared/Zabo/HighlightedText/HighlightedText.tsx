interface GetHighlightedTextProps {
  children: string;
  query: string;
}

const HighlightedText = ({ children, query }: GetHighlightedTextProps) => {
  const hasNoMatch =
    !query || !children.toLowerCase().includes(query.toLowerCase());
  if (hasNoMatch) {
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
