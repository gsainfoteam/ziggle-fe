import Flex from "src/atoms/containers/flex/Flex";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  border-radius: 5px;
  border: 1px solid ${colorSet.secondaryText};

  p {
    margin: 0;
  }
`;

interface ContentZaboProps {
  title: string;
  date: string;
  viewCount: number;
  author: string;
  content: string;
  organization: string;
}

const TextZabo = ({
  title,
  date,
  viewCount,
  author,
  content,
  organization,
}: ContentZaboProps) => {
  return (
    <ZaboWrapper>
      <Text font={Font.Bold} size="1.875rem">
        {title}
      </Text>
      <Text font={Font.Medium} size="1.125rem">
        {content}
      </Text>
      <Flex gap="0.25em">
        <Text font={Font.Medium} color={colorSet.secondaryText}>
          {date}
        </Text>
        <Text font={Font.Medium} color={colorSet.secondaryText}>
          •
        </Text>
        <Text font={Font.Bold} color={colorSet.secondaryText}>
          조회수 {viewCount}
        </Text>
      </Flex>
      <Text font={Font.Bold}>
        {author} • {organization}
      </Text>
    </ZaboWrapper>
  );
};

export default TextZabo;
