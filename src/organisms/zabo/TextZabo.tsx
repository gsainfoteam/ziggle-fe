import { useNavigate } from "react-router-dom";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Paths from "src/types/paths";
import { ZaboProps } from "src/types/types";
import formatISODate from "src/utils/formatISODate";
import styled, { css } from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";

const ZaboWrapper = styled(Button)<{
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

  background-color: ${colorSet.colorless};
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
  id,
}: ZaboProps) => {
  const [zaboHeight, zaboWidth] = [
    origin === "height" ? size : size * 1.5,
    origin === "height" ? size * 1.5 : size,
  ];

  const navigate = useNavigate();

  const handleZaboClick = () => {
    navigate(Paths.noticeDetail + id);
  };

  return (
    <ZaboWrapper
      height={zaboHeight}
      width={zaboWidth}
      shadowColor={colorSet.primary}
      onClick={handleZaboClick}
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

        <Spacer height={"10px"} />

        <Text
          font={Font.Medium}
          size="1.125rem"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: origin === "height" ? 5 : 8, // 이렇게밖에 안됨
            WebkitBoxOrient: "vertical",
            lineHeight: "1.5rem",
            wordBreak: "break-word",
          }}
        >
          {content}
        </Text>
      </Flex>

      <Flex flexDirection="column">
        <Flex gap="0.25em">
          <Text font={Font.Medium} color={colorSet.secondaryText}>
            {formatISODate(date)}
          </Text>
          <Text font={Font.Medium} color={colorSet.secondaryText}>
            •
          </Text>
          <Text font={Font.Bold} color={colorSet.secondaryText}>
            조회수 {viewCount}
          </Text>
        </Flex>
        <Text font={Font.Bold} textAlign="left">
          {author} {organization && `• ${organization}`}
        </Text>
      </Flex>
    </ZaboWrapper>
  );
};

export default TextZabo;
