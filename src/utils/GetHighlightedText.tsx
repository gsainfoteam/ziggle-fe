import Flex from "src/atoms/containers/flex/Flex";
import Text, { TextProps } from "src/atoms/text/Text";
import styled from "styled-components";

interface GetHighlightedTextProps extends TextProps {
  text: string;
  query: string;
  highlightColor?: string;
}

const HighlightTextWrap = styled(Flex)`
  p {
    display: inline;
  }
`;

const GetHighlightedText = ({
  color,
  font,
  size,
  text,
  query,
  highlightColor,
}: GetHighlightedTextProps) => {
  if (!query || !text.toLowerCase().includes(query.toLowerCase())) {
    // 검색어가 없거나 텍스트에 일치하는 부분이 없는 경우 그대로 반환
    return (
      <Text color={color} font={font} size={size}>
        {text}
      </Text>
    );
  }

  const regex = new RegExp(query, "gi");
  const match = text.match(regex);

  if (!match) return <></>;

  const result = text.split(regex);

  return (
    <HighlightTextWrap>
      {result.map((str, index) => {
        return (
          <Text key={index} color={color} font={font} size={size}>
            {str}
            {index !== result.length - 1 && (
              <Text color={highlightColor ?? color} font={font} size={size}>
                {match[index]}
              </Text>
            )}
          </Text>
        );
      })}
    </HighlightTextWrap>
  );
};

export default GetHighlightedText;
