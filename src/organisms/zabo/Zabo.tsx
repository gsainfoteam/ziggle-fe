import Flex from "src/atoms/containers/flex/Flex";
import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  img {
    border-radius: 5px;
  }

  p {
    margin: 0;
  }
`;

const Title = styled(Text)`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
Title.defaultProps = {
  font: Font.Bold,
  size: "1.25rem",
};

interface ZaboProps {
  title: string;
  date: string;
  viewCount: number;
  author: string;
  thumbnailUrl: string;
  organization: string;
}

const TextZabo = ({
  title,
  date,
  viewCount,
  author,
  thumbnailUrl,
  organization,
}: ZaboProps) => {
  return (
    <ZaboWrapper>
      <img src={thumbnailUrl} />
      <Title>{title}</Title>
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
