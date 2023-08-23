import Flex from "src/atoms/containers/flex/Flex";
import Highlight from "src/atoms/highlight/Highlight";
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
  text,
  query,
  highlightColor,
  ...textProps
}: GetHighlightedTextProps) => {
  if (!query || !text.toLowerCase().includes(query.toLowerCase())) {
    // 검색어가 없거나 텍스트에 일치하는 부분이 없는 경우 그대로 반환
    return <Text {...textProps}>{text}</Text>;
  }

  const regex = new RegExp(query, "gi");
  const match = text.match(regex);

  if (!match) return <></>;

  const result = text.split(regex);

  return (
    <HighlightTextWrap>
      {result.map((str, index) => {
        return (
          <Text key={index} {...textProps}>
            {str}
            {index !== result.length - 1 && (
              <Highlight color={highlightColor}>{match[index]}</Highlight>
            )}
          </Text>
        );
      })}
    </HighlightTextWrap>
  );
};

export default GetHighlightedText;
