import Flex from "src/atoms/containers/flex/Flex";
import { ZaboProps } from "src/types/types";
import styled, { css } from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled.div<{
  height: number;
  width: number;
  shadowColor: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 20px;
  margin-top: 1rem;

  max-height: ${(props) => props.height}px;
  min-width: ${(props) => props.width}px;
  box-sizing: border-box;
  overflow: hidden;

  border-radius: 5px;
  border: 1px solid ${colorSet.secondaryText};
  cursor: pointer;

  p {
    margin: 0;
  }

  transition: 0.1s;
  ${({ shadowColor }) => {
    return css`
      :hover {
        transform: translateY(-10px);
        box-shadow: ${shadowColor}40 0px 5px, ${shadowColor}30 0px 10px,
          ${shadowColor}20 0px 15px, ${shadowColor}10 0px 20px,
          ${shadowColor}05 0px 25px;
      }
    `;
  }}
`;

const TextZabo = ({
  title,
  date,
  viewCount,
  author,
  content,
  organization,
  origin,
  size,
}: ZaboProps) => {
  const [zaboHeight, zaboWidth] = [
    origin === "height" ? size : size * 1.5,
    origin === "height" ? size * 1.5 : size,
  ];
  return (
    <ZaboWrapper
      height={zaboHeight}
      width={zaboWidth}
      shadowColor={colorSet.primary}
    >
      <Flex>
        <Text
          font={Font.Bold}
          size="1.875rem"
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {title}
        </Text>
        <Text
          font={Font.Medium}
          size="1.125rem"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 5, // 이렇게밖에 안됨
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </Text>
      </Flex>

      <Flex flexDirection="column">
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
      </Flex>
    </ZaboWrapper>
  );
};

export default TextZabo;
