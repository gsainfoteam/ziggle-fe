import React from 'react';

interface GetHighlightedTextProps {
  text: string;
  query: string;
  highlightColor?: string;
  className: string;
}

const GetHighlightedText = ({
  text,
  query,
  highlightColor,
  className,
}: GetHighlightedTextProps) => {
  if (!query || !text.toLowerCase().includes(query.toLowerCase())) {
    // 검색어가 없거나 텍스트에 일치하는 부분이 없는 경우 그대로 반환
    return <p className={className}>{text}</p>;
  }

  const regex = new RegExp(query, 'gi');
  const match = text.match(regex);

  if (!match) return <></>;

  const result = text.split(regex);

  return (
    <p>
      {result.map((str, index) => (
        <React.Fragment key={index}>
          {index !== result.length - 1 ? (
            <span color={highlightColor}>{match[index]}</span>
          ) : (
            str
          )}
          ;
        </React.Fragment>
      ))}
    </p>
  );
};

export default GetHighlightedText;
