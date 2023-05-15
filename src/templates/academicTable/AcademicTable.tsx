import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import defaults from "src/styles/defaults";
import Font from "src/styles/font";
import styled from "styled-components";

export enum AcademicTableType {
  Title,
  Default,
}

interface AcademicTableProps {
  type: AcademicTableType;
  title?: string;
  tags?: string[];
  deadline?: string;
  date?: string;
}

const Wrapper = styled.div`
  width: 100vw;
  padding: 0 ${defaults.pageSideGap};
  box-sizing: border-box;
`;

const Cell = styled.div<{
  bgColor: string;
  borderColor: string;
  flexGrow?: number;
}>`
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  flex-grow: ${(props) => props.flexGrow || 0};
  width: 10rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`;

const TableWrapper = styled(Flex)``;

const AcademicTable = ({
  type,
  title,
  tags,
  deadline,
  date,
}: AcademicTableProps) => {
  const [color, bgColor, borderColor, Title, Tags, Deadline, Date] =
    type == AcademicTableType.Title
      ? [
          colorSet.colorless,
          colorSet.primary,
          colorSet.colorless,
          "제목",
          ["분류"],
          "마감일",
          "작성일",
        ]
      : [
          colorSet.text,
          colorSet.colorless,
          colorSet.deselected,
          title,
          tags,
          deadline,
          date,
        ];
  return (
    <Wrapper>
      <TableWrapper>
        <Cell bgColor={bgColor} borderColor={borderColor}>
          <Text textAlign="center" color={color} font={Font.Bold} size="1.2rem">
            {Tags?.join("/")}
          </Text>
        </Cell>
        <Cell bgColor={bgColor} borderColor={borderColor} flexGrow={4.5}>
          <Text
            textAlign={type == AcademicTableType.Title ? "center" : "left"}
            color={color}
            font={type == AcademicTableType.Title ? Font.Bold : Font.Regular}
            size="1.2rem"
          >
            {Title}
          </Text>
        </Cell>
        <Cell bgColor={bgColor} borderColor={borderColor}>
          <Text textAlign="center" color={color} font={Font.Bold} size="1.2rem">
            {Deadline}
          </Text>
        </Cell>
        <Cell bgColor={bgColor} borderColor={borderColor}>
          <Text textAlign="center" color={color} font={Font.Bold} size="1.2rem">
            {Date}
          </Text>
        </Cell>
      </TableWrapper>
    </Wrapper>
  );
};

export default AcademicTable;
